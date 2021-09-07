module.exports = app =>{

    const Clientes = app.db.models.Clientes;
    const Ventas = app.db.models.Ventas;

    //TRAE TODOS LOS CLIENTES CON SUS VENTAS
    app.route('/clientesventas')
        .get((req,res)=>{
            Clientes.findAll({include: Ventas})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            });
        });
        
    //TRAE UN CLIENTE EN ESPECICO CON SUS VENTAS
    app.route('/clientesventas/:dni')
        .get((req,res)=>{
            Clientes.findOne({ where:  req.params, include: Ventas})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            });
        });

    app.route('/clientes')
        .get((req,res)=>{
            Clientes.findAll({})
            .then(result => {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg: error.message});
            });
        })
        .post((req,res)=>{
            Clientes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
    
    app.route('/clientes/:dni')
        .get((req,res)=>{
            Clientes.findOne({where: req.params})
            .then((result)=> {
               // console.log(req.params.idProd);
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })
        .put((req,res)=>{
            Clientes.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
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