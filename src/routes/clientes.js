module.exports = app =>{

    const Clientes = app.db.models.Clientes;


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