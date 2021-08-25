module.exports = app =>{
    const Pedidos = app.db.models.Pedidos;
    const Productos = app.db.models.Productos;
    const Items = app.db.models.Items;
    const Ventas = app.db.Ventas;


    
    app.route('/items')
        .get((req,res)=>{
            Items.findAll({}) 
            .then(result=> res.json(result))
            .catch(error=>{
                res.status(412).json({msg: error.message});
            })
        })
        .post((req,res)=>{
            Items.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error});
            });
        });

    app.route('/items/:idItem')
        .put((req,res)=>{
            Items.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        .delete((req,res)=>{
            Items.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
            .catch(error=>{
                res.status(412).json({msg:error.message});
            })
        })    



    app.route('/itemVenta/:VentaIdVenta')
        .get((req,res)=>{
            Items.findAll({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })  
    app.route('/item/:ProductoIdProd')
       /* .get((req,res)=>{
            Items.findOne({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })*/
        .put((req,res)=>{
            Items.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        

}