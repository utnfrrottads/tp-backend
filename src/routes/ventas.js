module.exports = app =>{

    const Ventas = app.db.models.Ventas;
    const Solicitudes = app.db.models.Solicitudes;

    app.route('/ventasol')
    .get((req,res)=>{
        Ventas.findAll({include: Solicitudes}) 
        .then(result=> res.json(result))
        .catch(error=>{
            res.status(412).json({msg: error.message});
        })
    })

    app.route('/ventas')
        .get((req,res)=>{
            Ventas.findAll({})
            .then(result => {
                console.log(Ventas);
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg: error.message});
            });
        })
        .post((req,res)=>{
            Ventas.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
    
    app.route('/ventas/:idVenta')
        .get((req,res)=>{
            Ventas.findOne({where: req.params})
            .then((result)=> {
                console.log(req.params.idVenta);
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })
        .put((req,res)=>{
            Ventas.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        .delete((req,res) => {
            Ventas.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg:error.message});
            })

        })
}