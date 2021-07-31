module.exports = app =>{
    const Pedidos = app.db.models.Pedidos;
    const Productos = app.db.models.Productos;
    const Solicitudes = app.db.models.Solicitudes;
    const Ventas = app.db.Ventas;


    
    app.route('/solicitudes')
        .get((req,res)=>{
            Solicitudes.findAll({}) 
            .then(result=> res.json(result))
            .catch(error=>{
                res.status(412).json({msg: error.message});
            })
        })
        .post((req,res)=>{
            Solicitudes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error});
            });
        });

    app.route('/solicitudventa/:VentaIdVenta')
        .get((req,res)=>{
            Solicitudes.findAll({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })  
    app.route('/solicitudpedido/:PedidoIdPedido')
        .get((req,res)=>{
            Solicitudes.findAll({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })  
    app.route('/solicitudes/:PedidoIdPedido/:ProductoIdProd')
        .get((req,res)=>{
            Solicitudes.findOne({where: req.params})
            .then((result)=> {
                res.json(result)
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })
        .put((req,res)=>{
            Solicitudes.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        

}