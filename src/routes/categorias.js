module.exports = app =>{

    const Categorias = app.db.models.Categorias;
    const Productos = app.db.models.Productos;
  

    app.route('/categoriasproductos')
        .get((req,res)=>{
            Categorias.findAll({include: Productos})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            });
        });
        

    app.route('/categorias')
        .get((req,res)=>{
            Categorias.findAll({})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg: error.message});
            });
        })
        .post((req,res)=>{
            Categorias.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });

}