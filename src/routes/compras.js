module.exports = app => {
    const Productos = app.db.models.Productos;
    const Proveedores = app.db.models.Proveedores;
    const ComprasItems = app.db.models.ComprasItems;
    const Compras = app.db.models.Compras;

    app.route('/api/compras')
        .get((req, res) => {
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            Compras.findAndCountAll({
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order],
                include: [
                    {
                        model: ComprasItems, as: 'comprasItems',
                        include: {
                            model: Productos, as: 'producto'
                        }
                    },
                    {
                        model: Proveedores, as: 'proveedor'
                    }
                ]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            try {
                const result = Sequelize.transaction((t) => {
                    // creo compra
                    const compras = Compras.create({
                        fecha: req.body.fecha,
                        proveedorId: req.body.proveedorId
                    }, { transaction: t });

                    req.body.items.forEach(item => {
                        if (item.productoId > 0) { // actualizo productos
                            Productos.update({
                                stock: stock + item.producto.stock,
                            }, { where: { id: item.producto.id} }, { transaction: t });
                        } else { // creo nuevos productos
                            Productos.create({
                                ...item.producto,
                                categoriaId: item.producto.categoriaId,
                                activo: true
                            }, { transaction: t });
                        }

                        // cargo items
                        ComprasItems.create({
                            precio: item.precio,
                            cantidad: item.cantidad,
                            productoId: item.producto.id,
                            compraId: compras.id
                        }, { transaction: t });
                    });

                    return compras;
                });
                res.json(result);
                console.log(result);
            } catch (error) {
                console.log(error);
                res.status(412).json({ msg: error.message });
            }
        });

    app.route('/api/compras/:id')
        .get((req, res) => {
            Compras.findOne({
                where: req.params,
                include: [
                    {
                        model: ComprasItems, as: 'comprasItems',
                        include: {
                            model: Productos, as: 'producto'
                        }
                    },
                    {
                        model: Proveedores, as: 'proveedor'
                    }
                ]
            })
                .then(result => res.json(result))
                .catch(err => {
                    res.status(412).json({ msg: err.message });
                })
        });
}
