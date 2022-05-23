module.exports = app => {
    const Ventas = app.db.models.Ventas;
    const VentasItems = app.db.models.VentasItems;
    const Clientes = app.db.models.Clientes;
    const Productos = app.db.models.Productos;
    const sequelize = app.db.sequelize;

    app.route('/api/ventas')
        .get((req, res) => {
            function styleHyphenFormat(propertyName) {
                function upperToHyphenLower(match) {
                    return '_' + match.toLowerCase();
                }
                return propertyName.replace(/[A-Z]/, upperToHyphenLower);
            }
            let orden = '';
            if (req.query.order) {
                orden = req.query.order.split(",", 2)
                orden = styleHyphenFormat(orden[0]) + ' ' + orden[1];
            } else {
                orden = '1 asc';
            }
            let colum = '';
            let extra = `order by ${orden} limit ? offset ?`
            let sql = ` select v.id, v.fecha,
								cliente.nombre AS "nombre", cliente.apellido AS "apellido", cliente.dni AS "dni"								
                        from ventas AS v
                        left outer join clientes AS cliente
                        on v.cliente_dni = cliente.dni
                        left outer join ventas_items AS vi
                        on v.id = vi.venta_id
                        left outer join productos AS p
                        on vi.producto_id = p.id ` ;
            let query = sql + extra;
            let replacements = [req.query.limit, req.query.offset * req.query.limit];
            if (req.query.clienteId) {
                colum = colum ? `cliente.dni = ? and ${colum}` : `cliente.dni = ?`;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift(req.query.clienteId);
            }
            sequelize.query(
                query,
                {
                    replacements: replacements
                }
            )
                .then(result => {
                    res.json({ "count": result.slice(1).pop().rowCount, "rows": result.slice(1).pop().rows });
                })
                .catch(error => {
                    res.status(412).json(error.message);
                })

        })
        .post(async (req, res) => {
            await app.db.sequelize.transaction().then(async t => {
                // Creo cliente si no existe
                if (!req.body.cliente.id) {
                    const cliente = await Clientes.create({
                        ...req.body.cliente,
                        activo: true
                    }, { transaction: t });

                    req.body.cliente = cliente.dataValues;
                }

                // Creo venta
                const venta = await Ventas.create({
                    fecha: req.body.fecha,
                    clienteDni: req.body.cliente.dni
                }, { transaction: t });

                // Creo items de compra
                for (const item of req.body.itemsVentas) {
                    // actualizo producto
                    const productoExistente = await Productos.findOne({ where: { id: item.producto.id }, transaction: t });
                    if (productoExistente) {
                        await productoExistente.update({
                            stock: productoExistente.stock - item.cantidad
                        }, { transaction: t });
                    } else {
                        res.status(412).json({ msg: 'Producto no encontrado: ' + item.producto.descripcion });
                    }

                    await VentasItems.create({
                        precio: item.precio,
                        cantidad: item.cantidad,
                        productoId: item.producto.id,
                        VentaId: venta.dataValues.id
                    }, { transaction: t });
                }

                // commit de transaction
                try {
                    await t.commit();
                    res.json(venta);
                } catch (err) {
                    await t.rollback();
                    res.status(412).json({ msg: err.message });
                }

            }).catch(async err => {
                res.status(412).json({ msg: err.message });
            });
        });
    app.route('/api/ventas/:id')
        .get((req, res) => {
            Ventas.findOne(
                {
                    where: req.params,
                    include: [
                        {
                            model: VentasItems, as: 'ventasItems',
                            include: {
                                model: Productos, as: 'producto'
                            }
                        },
                        {
                            model: Clientes, as: 'cliente'
                        }
                    ]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });
}
