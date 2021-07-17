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
            })
        })
        .post((req,res)=>{
            Solicitudes.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error});
            });
        });

}