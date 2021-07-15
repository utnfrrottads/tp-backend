module.exports = app =>{
    const Pedidos = app.db.models.Pedidos;
    const Productos = app.db.models.Productos;
    const Solicitudes = app.db.models.Solicitudes;



    app.route('/solicitudes')
    .get((req,res)=>{
        Solicitudes.findAll({}) 
        .then(result=> res.json(result))
        .catch(error=>{
            res.status(412).json({msg: error.message});
        });
    });

    app.route('/solicitudes/:idPedido')
        .post((req,res)=>{
            Pedidos.findOne({where: req.params})
            .then((Pedido)=>{
                //console.log(`Parametro de prod: ${req.params.idProd} parametro de prov: ${req.body.idProv}`);
                //res.json(result);
                Productos.findOne({where: req.body.idProd})
                .then((Producto)=>{
                    Pedido.addProductos(Producto);
                   res.send(`Producto: ${Pedido} y Proveedor: ${Producto} agregados`)
                })
                .catch(error =>{
                    res.status(412).json({msg:error.message})
                })
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
            
        })

}