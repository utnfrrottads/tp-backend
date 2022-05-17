module.exports = app => {
    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;

    const Productos = app.db.models.Productos;
    const Proveedores = app.db.models.Proveedores;
    const ComprasItems = app.db.models.ComprasItems;
    const Compras = app.db.models.Compras;

    app.route('/api/compras')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.proveedorId) {
                Object.assign(whereCondition, {
                    proveedorId: req.query.proveedorId
                });
            }
            if (req.query.desde && req.query.hasta) {
                Object.assign(whereCondition, {
                    fecha: {
                        [Op.between]: [req.query.desde, req.query.hasta]
                    }
                });
            } else {
                if (req.query.desde) {
                    Object.assign(whereCondition, {
                        fecha: {
                            [Op.gte]: req.query.desde
                        }
                    });
                }
                if (req.query.hasta) {
                    Object.assign(whereCondition, {
                        fecha: {
                            [Op.lte]: req.query.hasta
                        }
                    });
                }
            }

            let order = req.query.order ? req.query.order.split(",", 2) : [];
            if (order && order[0] === 'proveedor.razonSocial') {
                order = [Sequelize.literal('"proveedor"."razon_social"'), order[1]];
            }
            Compras.findAndCountAll({
                where: whereCondition,
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order],
                include: [
                    {
                        model: Proveedores, as: 'proveedor',
                        required: true,
                    },
                    {
                        separate: true,
                        model: ComprasItems, as: 'comprasItems',
                        include: {
                            model: Productos, as: 'producto'
                        }
                    }
                ]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post(async (req, res) => {
            await app.db.sequelize.transaction().then(async t => {
                // Creo proveedor si no existe
                if (!req.body.proveedor.id) {
                    const proveedor = await Proveedores.create({
                        ...req.body.proveedor,
                        activo: true
                    }, { transaction: t });

                    req.body.proveedor = proveedor.dataValues;
                }

                // Creo compra
                const compra = await Compras.create({
                    fecha: req.body.fecha,
                    proveedorId: req.body.proveedor.id
                }, { transaction: t });

                // Creo items de compra
                for (const item of req.body.itemsCompras) {
                    if (item.producto.id > 0) { // actualizo producto
                        const productoExistente = await Productos.findOne({ where: { id: item.producto.id }, transaction: t });
                        if (productoExistente) {
                            await productoExistente.update({
                                stock: productoExistente.stock + item.cantidad
                            }, { transaction: t });
                        } else {
                            res.status(412).json({ msg: 'Producto no encontrado: ' + item.producto.descripcion });
                        }
                    } else { // creo nuevo producto
                        const productoExistente = await Productos.findOne({
                            where: {
                                descripcion: item.producto.descripcion,
                                categoriaId: item.producto.categoriaId
                            },
                            transaction: t
                        });
                        if (productoExistente) {
                            await productoExistente.update({
                                stock: productoExistente.stock + item.cantidad
                            }, { transaction: t });
                            item.producto = productoExistente;
                        } else {
                            const producto = await Productos.create({
                                ...item.producto,
                                categoriaId: item.producto.categoriaId,
                                stock: item.cantidad,
                                activo: true
                            }, { transaction: t });
                            item.producto = producto.dataValues;
                        }
                    }

                    await ComprasItems.create({
                        precio: item.precio,
                        cantidad: item.cantidad,
                        productoId: item.producto.id,
                        CompraId: compra.dataValues.id
                    }, { transaction: t });
                }

                // commit de transaction
                try {
                    await t.commit();
                    res.json(compra);
                } catch (err) {
                    await t.rollback();
                    res.status(412).json({ msg: err.message });
                }

            }).catch(async err => {
                res.status(412).json({ msg: err.message });
            });
        });

    app.route('/api/compras/:id')
        .get((req, res) => {
            Compras.findOne({
                where: req.params,
                include: [
                    {
                        model: Proveedores, as: 'proveedor'
                    },
                    {
                        model: ComprasItems, as: 'comprasItems',
                        include: {
                            model: Productos, as: 'producto'
                        }
                    }
                ]
            })
                .then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({ msg: err.message });
                })
        });
}
