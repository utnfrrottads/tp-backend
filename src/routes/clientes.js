module.exports = app =>{
    const Sequelize = require("sequelize");
    const Clientes = app.db.models.Clientes;


    app.route('/api/clientes')

        .get((req,res)=>{
          const whereCondition = {};
          if(req.query.nombre){
            Object.assign(whereCondition, {
              nombre: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nombre')), 'LIKE', '%'+ req.query.nombre +'%')
            });
          }
          if(req.query.apellido){
            Object.assign(whereCondition, {
              apellido: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('apellido')), 'LIKE', '%'+ req.query.apellido +'%')
            });
          }



          if (req.query.activo) {
              Object.assign(whereCondition, {
                  activo: req.query.activo
              });
          }

          const order = req.query.order ? req.query.order.split(",",2) : [];

          Clientes.findAndCountAll({
            where: whereCondition,
            limit: req.query.limit,
            offset: req.query.offset * req.query.limit,
            order: [order],
          })
          .then(result => res.json(result))
          .catch(error =>{
            res.status(412).json({msg: error.message});
          });
        })

        .post((req,res)=>{
            req.body.activo = true;
            Clientes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .put((req,res)=>{
          Clientes.update(req.body,{where: {dni: req.body.dni}})
          .then(result => res.json(result))
          .catch(error =>{
            res.status(412).json({msg: error.message});
          })
        });


    app.route('/api/clientes/:dni')
        .get((req,res)=>{
            Clientes.findOne({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })

        .delete((req,res) => {
            Clientes.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg:error.message});
            })

        })
}
