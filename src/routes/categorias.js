const {Op} = require("sequelize");
module.exports = app => {

    const {Sequelize, Op} = require("sequelize");
    const { QueryTypes } = require('sequelize');
    const Categorias = app.db.models.Categorias;
    const sequelize = app.db.sequelize;

    app.route('/api/categorias-productos')
        .get((req, res) => {
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            console.log('activa',req.query.activa);
           if (!req.query.descripcion){
               if(!req.query.activa){
                   req.query.activa = false;
               }
               Categorias.findAndCountAll({
                   where:{
                       activa: req.query.activa
                   },
                   limit: req.query.limit,
                   offset: req.query.offset * req.query.limit,
                   order: [order],
               })
                   .then(result => res.json(result))
                   .catch(error => {
                       res.status(412).json({msg: error.message});
                   });
           }else{
               if (req.query.activa) {
                   Categorias.findAndCountAll({
                       where: {
                           descripcion: {
                               [Op.iLike]: '%' + req.query.descripcion + '%'
                           },
                           activa: {
                               [Op.is]: true
                           }
                       },
                       limit: req.query.limit,
                       offset: req.query.offset * req.query.limit,
                       order: [order],
                   })
                       .then(result => res.json(result))
                       .catch(error => {
                           res.status(412).json({msg: error.message});
                       });
               }else{
                   Categorias.findAndCountAll({
                       where: {
                           descripcion: {
                               [Op.iLike]: '%' + req.query.descripcion + '%'
                           }
                       },
                       limit: req.query.limit,
                       offset: req.query.offset * req.query.limit,
                       order: [order],
                   })
                       .then(result => res.json(result))
                       .catch(error => {
                           res.status(412).json({msg: error.message});
                       });
               }
           }

            /*sequelize.query(
                'SELECT * FROM "Categorias"',
                {
                    type: QueryTypes.SELECT
                }
            )
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });*/
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
