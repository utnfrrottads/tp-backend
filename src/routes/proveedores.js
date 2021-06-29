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

}