module.exports = app => {

    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const Productos = app.db.models.Productos;
    const Categorias = app.db.models.Categorias;
    const sequelize = app.db.sequelize;

    app.route('/api/productos')
        .get((req, res) => {
            function styleHyphenFormat(propertyName)
            {
                function upperToHyphenLower(match)
                {
                    return '_' + match.toLowerCase();
                }
                return propertyName.replace(/[A-Z]/, upperToHyphenLower);
            }
            let orden = '';
            if (req.query.order){
                orden = req.query.order.split(",", 2)
                orden = styleHyphenFormat(orden[0]) + ' ' + orden[1];
            }else{
                orden = '1 asc';
            }
            let colum = '';
            let extra = `order by ${orden} limit ? offset ?`
            let sql = ` SELECT p."id", p."descripcion", p."stock", 
                         p."cantidad_minima" AS "cantidadMinima", p."precio_venta" AS "precioVenta",
                         p."activo", p."created_at" AS "createdAt", 
                         p."updated_at" AS "updatedAt", p."categoria_id" AS "categoriaId", 
                         "c"."id" AS "categoria.id", "c"."descripcion" AS "categoria.descripcion",
                         c."activa" AS "c.activa", c."created_at" AS "c.createdAt", c."updated_at" AS "c.updatedAt"
                        FROM "productos" AS p 
                        LEFT OUTER JOIN "categorias" AS "c" 
                        ON p."categoria_id" = c."id" ` ;
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
            if (req.query.descripcion){
                colum = colum ? `p.descripcion ilike ? and ${colum}` : `p.descripcion ilike ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%'+req.query.descripcion+'%');
            }
            if (req.query.categoriaId){
                colum = colum ? `p.categoria_id = ? and ${colum}` : `p.categoria_id = ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift(req.query.categoriaId);
            }
            if (req.query.activo){
                colum = colum ? `p.activo = true and ${colum}` : `p.activo = true `;
                query = `${sql} where ${colum} ${extra}`;
            }
            if (req.query.requiereStock){
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
                    res.json({"count": result.slice(1).pop().rowCount, "rows": result.slice(1).pop().rows });
                })
                .catch(error => {
                    console.log(error);
                    res.status(412).json(error.message);
                })
        })
        .post((req, res) => {
            req.body.activo = true;
            Productos.create(req.body)
                .then(result => res.status(200).json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Productos.update(req.body, { where: {id: req.body.id} })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/productos/:id')
        .get((req, res) => {
            Productos.findOne({
                where: req.params,
                include: [{ model: Categorias, as: 'categoria' }]
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
