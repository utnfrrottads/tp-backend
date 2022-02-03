const {Op, col} = require("sequelize");
module.exports = app => {

    const {Sequelize, Op} = require("sequelize");
    const { QueryTypes } = require('sequelize');
    const Categorias = app.db.models.Categorias;
    const sequelize = app.db.sequelize;

    app.route('/api/categorias-productos')
        .get((req, res) => {
            const order = req.query.order ? req.query.order.replace(',', ' ') : [];
            let colum = '';
            let sql = `SELECT * FROM "Categorias"` ;
            let extra = ` order by ${order} limit ? offset ?`
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
            if(req.query.descripcion){
                colum = colum ? `descripcion ilike ? and ${colum}` : `descripcion ilike ?`;
                 query = `${sql} where ${colum} ${extra}`;
                 replacements.unshift('%'+req.query.descripcion+'%');
                //replacements = ['%'+req.query.descripcion+'%',req.query.limit,req.query.offset * req.query.limit];
            }
            if(req.query.activa){
                colum = colum ? `activa = true and ${colum}` : `activa = true`;
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
                res.status(412).json({msg: error.message})
             })
        })

        .post((req, res) => {
            req.body.activa = true;
            Categorias.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Categorias.update(req.body, { where: {id: req.body.id} })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/categorias-productos/:id')
        .get((req, res) => {
            Categorias.findOne({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Categorias.destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
