module.exports = app =>{

    const Sequelize = require("sequelize");
    const Clientes = app.db.models.Clientes;
    const Ventas = app.db.models.Ventas;
    const sequelize = app.db.sequelize;

    app.route('/api/cliente')
        .get((req,res)=>{

          //const order = req.query.order ? req.query.order.split(",",2) : [];
          const order = req.query.order ? req.query.order.replace(',',' ') : [];

            let colum = '';
            let sql = `SELECT * FROM "Clientes" ` ;
            let extra = `order by ${order} limit ? offset ?`
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
          if(req.query.nombre){
              colum = colum ? `nombre ilike ? and ${colum}` : `nombre ilike ? `;
              query = `${sql} where ${colum} ${extra}`;
              replacements.unshift('%'+req.query.nombre+'%');
          }
          if(req.query.apellido){
              colum = colum ? `apellido ilike ? and ${colum}` : `apellido ilike ? `;
              query = `${sql} where ${colum} ${extra}`
              replacements.unshift('%'+req.query.apellido+'%');
          }
          if(req.query.dni){
              colum = colum ? `dni ilike ? and ${colum}` : `dni ilike ? `;
              query = `${sql} where ${colum} ${extra}`;
              replacements.unshift('%'+req.query.dni+'%');
          }
          if(req.query.direccion){
              colum = colum ? `direccion ilike ? and ${colum}` : `direccion ilike ? `;
              query = `${sql} where ${colum} ${extra}`;
              replacements.unshift('%'+req.query.direccion+'%');
          }
          if(req.query.tipoCliente){
              colum = colum ? `"tipoCliente" ilike ? and ${colum}` : `"tipoCliente" ilike ? `;
              query = `${sql} where ${colum} ${extra}`;
              replacements.unshift('%'+req.query.tipoCliente+'%');
          }
          if(req.query.activo){
              colum = colum ? `activo = true and ${colum}` : `activo = true `;
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
        .post((req,res)=>{
            req.body.activo = true;
            req.body.tipoCliente = req.body.tipoCliente.toUpperCase();
            Clientes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .put((req,res)=>{
            req.body.tipoCliente = req.body.tipoCliente.toUpperCase();
            Clientes.update(req.body,{where: {dni: req.body.dni}})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg: error.message});
            })
        });

    app.route('/api/cliente/:dni')
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
