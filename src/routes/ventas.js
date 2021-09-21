module.exports = app =>{

    const Ventas = app.db.models.Ventas;
    const Items = app.db.models.Items;
    const Clientes = app.db.models.Clientes;
    const Productos = app.db.models.Productos;


    // TRAE LAS VENTAS CON SU CLIENTE
        app.route('/ventascli')
        .get((req,res)=>{
            Ventas.findAll({include: Clientes}) 
            .then(result=> res.json(result))
            .catch(error=>{
                res.status(412).json({msg: error.message});
            })
        })

    // TRAE TODOS LOS ITEMS DE LAS VENTAS
    app.route('/ventaitems')
        .get((req,res)=>{
            Ventas.findAll({include: Items}) 
            .then(result=> res.json(result))
            .catch(error=>{
                res.status(412).json({msg: error.message});
            })
        })

    //MUESTRA DETALLE DE UNA VENTA EN ESPECIFICO
    app.route('/ventadetalle/:idVenta')
        .get((req,res)=>{
            Ventas.findOne(
                {
                    where:  req.params 
                    ,
                    include: [
                    {
                        model: Items,
                        include:{
                            model: Productos
                        }
                    },
                    {
                        model: Clientes
                    }
                    ]
                }) 
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