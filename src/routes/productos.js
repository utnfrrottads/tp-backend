module.exports = app => {
    const Productos = app.db.models.Productos;
    const Categorias = app.db.models.Categorias;
    const PreciosVenta = app.db.models.PreciosVenta;
    const sequelize = app.db.sequelize;

    app.route('/api/productos')
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
            let sql = ` SELECT p."id", p."descripcion", p."stock", 
                            p."cantidad_minima" AS "cantidadMinima",
                            p."activo", p."created_at" AS "createdAt", 
                            p."updated_at" AS "updatedAt", p."categoria_id" AS "categoriaId", 
                            categoria."id" AS "categoriaId", categoria."descripcion"  AS "categoria.descripcion",
                            categoria."activa" , categoria."created_at", categoria."updated_at",
                            pv3."precio" AS "precioVenta"
                        FROM "productos" AS p 
                        LEFT OUTER JOIN "categorias" AS categoria
                            ON p."categoria_id" = categoria."id" 
                        LEFT OUTER JOIN (SELECT pv1.*  FROM  "precios_venta" pv1
                                WHERE (pv1.producto_id, pv1.fecha) IN (
                                        SELECT pv2.producto_id, max(fecha)
                                        FROM "precios_venta" pv2
                                        GROUP BY pv2.producto_id
                                    )
                                ) pv3
                            ON p.id = pv3.producto_id
                        ` ;
            let query = sql + extra;
            let replacements = [req.query.limit, req.query.offset * req.query.limit];
            if (req.query.descripcion) {
                colum = colum ? `p.descripcion ilike ? and ${colum}` : `p.descripcion ilike ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%' + req.query.descripcion + '%');
            }
            if (req.query.categoriaId) {
                colum = colum ? `p.categoria_id = ? and ${colum}` : `p.categoria_id = ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift(req.query.categoriaId);
            }
            if (req.query.activo) {
                colum = colum ? `p.activo = true and ${colum}` : `p.activo = true `;
                query = `${sql} where ${colum} ${extra}`;
            }
            if (req.query.requiereStock) {
                colum = colum ? `p.stock <= p.cantidad_minima and ${colum}` : `p.stock <= p.cantidad_minima `;
                query = `${sql} where ${colum} ${extra}`;
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
                // Creo producto
                const producto = await Productos.create({
                    descripcion: req.body.descripcion,
                    categoriaId: req.body.categoriaId,
                    stock: req.body.stock,
                    cantidadMinima: req.body.cantidadMinima,
                    activo: true
                }, { transaction: t });

                // Creo precio de venta
                await PreciosVenta.create({
                    precio: req.body.precioVenta,
                    fecha: Date.now(),
                    ProductoId: producto.dataValues.id
                }, { transaction: t });

                // commit de transaction
                try {
                    await t.commit();
                    res.json(producto);
                } catch (err) {
                    await t.rollback();
                    res.status(412).json({ msg: err.message });
                }
            }).catch(async err => {
                res.status(412).json({ msg: err.message });
            });
        })
        .put(async (req, res) => {
            await app.db.sequelize.transaction().then(async t => {
                // Actualizo producto
                const producto = await Productos.update(req.body, {
                    where: { id: req.body.id },
                    transaction: t
                });

                // busco último precio
                const ultimoPrecio = await PreciosVenta.findOne({ where: { productoId: req.body.id }, order: [['fecha', 'DESC']], transaction: t });
                if (ultimoPrecio == null || ultimoPrecio.precio !== req.body.precioVenta) {
                    // actualizo de ser necesario
                    await PreciosVenta.create({
                        precio: req.body.precioVenta,
                        fecha: Date.now(),
                        ProductoId: req.body.id
                    }, { transaction: t });
                }

                // commit de transaction
                try {
                    await t.commit();
                    res.json(producto);
                } catch (err) {
                    await t.rollback();
                    res.status(412).json({ msg: err.message });
                }
            }).catch(async err => {
                res.status(412).json({ msg: err.message });
            });
        });

    app.route('/api/productos/:id')
        .get((req, res) => {
            Productos.findOne({
                where: req.params,
                include: [
                    { model: Categorias, as: 'categoria' },
                    {
                        separate: true,
                        model: PreciosVenta, as: 'preciosVenta'
                    }]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Productos.destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
