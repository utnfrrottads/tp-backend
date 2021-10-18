module.exports = app =>{
    const Proveedores = app.db.models.Proveedores;
    const Productos = app.db.models.Productos;
    const ProveedorProductos = app.db.models.ProveedorProductos;




    app.route('/api/provedoresproductos')
    .get((req,res)=>{

        const order = req.query.order ? req.query.order.split(",",2) : [];

        ProveedorProductos.findAndCountAll({
            limit: req.query.limit,
            offset: req.query.offset * req.query.limit,
            order: [order],
            include: [
                {
                    model: Productos
                },
                {
                    model: Proveedores, as: 'Proveedor'
                }
            ]
        })
        .then(result=> res.json(result))
        .catch(error=>{
            res.status(412).json({msg: error.message});
        });
    })
    .post((req,res)=>{
        req.body.activo = true;
        ProveedorProductos.create(req.body)
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({msg: error});
            });
    })
    .put((req,res)=>{
        ProveedorProductos.update(req.body, {where: {id:req.body.id}})
             .then(result => res.sendStatus(204))
             .catch(error =>{
                 res.status(412).json({msg:error.message});
            })
    })
    ;

    app.route('/api/provedoresproductos/:id')
        .get((req, res)=>{
            ProveedorProductos.findOne({
                    where: req.params,
                    include: [
                        {
                            model: Productos
                        },
                        {
                            model: Proveedores, as: 'Proveedor'
                        }
                    ]
            })
                .then(result => res.json(result))
                .catch(err =>{
                    res.status(412).json({msg: err.message});
                })
        })
        .delete((req,res) => {
            ProveedorProductos.destroy({where: req.params})
                .then(result=> res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg:error.message});
                })

        })



}
