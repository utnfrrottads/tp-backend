module.exports = app =>{
    const Proveedores = app.db.models.Proveedores;
    const Productos = app.db.models.Productos;
    const ProveedorProductos = app.db.models.ProveedorProductos;



    app.route('/propros')
    .get((req,res)=>{
        ProveedorProductos.findAll({}) 
        .then(result=> res.json(result))
        .catch(error=>{
            res.status(412).json({msg: error.message});
        });
    })
    .post((req,res)=>{
        ProveedorProductos.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error});
            });
    })
    ;

    app.route('/propro/:idProd')
        .post((req,res)=>{
            Productos.findOne({where: req.params})
            .then((producto)=>{
                console.log(`Parametro de prod: ${req.params.idProd} parametro de prov: ${req.body.idProv}`);
                //res.json(result);
                Proveedores.findOne({where: req.body.idProv})
                .then((proveedor)=>{
                   producto.addProveedores(proveedor);
                   res.send(`Producto: ${producto} y Proveedor: ${proveedor} agregados`)
                })
                .catch(error =>{
                    res.status(412).json({msg:error.message})
                })
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
            
        })
//ESTA QUERY NO ES NECESARIA PERO PODRIA SERVIR PARA OTRA OCASION
        app.route('/propro')
        .get((req,res)=>{
            Productos.findAll({
                include:{
                    model: Proveedores,
                    required: true
                }
            })
            .then(result=> res.json(result))
            .catch(error=>{
                res.status(412).json({msg: error.message});
            });
        });

}