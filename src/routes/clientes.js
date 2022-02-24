module.exports = app =>{

    const Sequelize = require("sequelize");
    const Clientes = app.db.models.Clientes;
    const Ventas = app.db.models.Ventas;
    const sequelize = app.db.sequelize;

    app.route('/api/clientes')
        .get((req,res)=>{
            /*
            const columArray = ['dni', 'nombre','apellido','tipo','telefono'];
            const ordenArray = ['asc','desc'];
            let orden = columArray.find(e=>e.toUpperCase() === order[0].toUpperCase());
            orden = orden + ' ' + ordenArray.find(t=> t.toUpperCase()===order[1].toUpperCase());
            */
            let orden = req.query.order ? req.query.order.replace(',',' ') : '1 asc';
            let colum = '';
            let sql = `SELECT * FROM Clientes ` ;
            let extra = `order by ${orden} limit ? offset ?`
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
                  colum = colum ? `dni = ? and ${colum}` : `dni = ? `;
                  query = `${sql} where ${colum} ${extra}`;
                  replacements.unshift(req.query.dni);
            }
            if(req.query.direccion){
                  colum = colum ? `direccion ilike ? and ${colum}` : `direccion ilike ? `;
                  query = `${sql} where ${colum} ${extra}`;
                  replacements.unshift('%'+req.query.direccion+'%');
            }
            if(req.query.tipo){
                  colum = colum ? `"tipo" ilike ? and ${colum}` : `"tipo" ilike ? `;
                  query = `${sql} where ${colum} ${extra}`;
                  replacements.unshift('%'+req.query.tipo+'%');
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
                    res.status(412).json(error)
                })
        })
        .post((req,res)=>{
            req.body.activo = true;
            req.body.tipo = req.body.tipo.toUpperCase();
            console.log(req.body);
            Clientes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        })
        .put((req,res)=>{
            req.body.tipo = req.body.tipo.toUpperCase();
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
