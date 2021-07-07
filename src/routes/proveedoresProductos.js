module.exports = app =>{
    const Proveedores = app.db.models.Proveedores;
    const Productos = app.db.models.Productos;

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

    app.route('/propro/:idProd')
        .post((req,res)=>{
            Productos.findOne({where: req.params})
            .then((result)=>{
                console.log(`Parametro de prod: ${req.params.idProd} parametro de prov: ${req.body.idProv}`);
                res.json(result);
            })
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
            
        })



}