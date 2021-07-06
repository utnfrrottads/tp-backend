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
    app.route('/categorias/:idCategoria')
        .get((req,res)=>{
            Categorias.findOne({where: req.params})
            .then(result=> res.json(result))
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })
        .put((req,res)=>{
            Categorias.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        .delete((req,res) => {
            Categorias.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg:error.message});
            })

        })

}