module.exports = app =>{

    const Proveedores = app.db.models.Proveedores;


    app.route('/proveedores')
        .get((req,res)=>{
            Proveedores.findAll({})
            .then(result => res.json(result))
            .catch(error =>{
                res.status(412).json({msg: error.message});
            });
        })
        .post((req,res)=>{
            Proveedores.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error.message});
            });
        });
    app.route('/proveedores/:idProv')
        .get((req,res)=>{
            Proveedores.findOne({where: req.params})
            .then(result=> res.json(result))
            .catch(error =>{
                res.status(412).json({msg:error.message})
            })
        })
        .put((req,res)=>{
            Proveedores.update(req.body, {where: req.params})
            .then(result => res.sendStatus(204))
            .catch(error =>{
                res.status(412).json({msg:error.message});
            })
        })
        .delete((req,res) => {
            Proveedores.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
            .catch(error => {
                res.status(412).json({msg:error.message});
            })

        })
}