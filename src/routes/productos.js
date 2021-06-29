module.exports = app =>{

    const Productos = app.db.models.Productos;


    app.route('/productos')
        .get((req,res)=>{
            Productos.findAll({})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg: error.message});
            });
        })
        .post((req,res)=>{
            Productos.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });

}