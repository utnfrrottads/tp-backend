module.exports =  app => {

    const Clients = app.db.models.clients;


    app.route('/clients')
        .get((req,res) => {
        
            Clients.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({msg: error.message})
            });
        })
        .post((req,res) => {
            Clients.create(req.body)
                .then(result => res.json(result))
                .catch(error =>{
                    res.status(412).json({msg:error.message});
                })
        });


    app.route('/clients/:id')
        .get((req,res) => {
            Clients.findOne({where: req.params})
                .then(result=> res.json(result))
                .catch(error => {
                    res.status(412).json({msg:error.message})
                })
        })
        .put((req,res) => {
            Clients.update(req.body , {where: req.params})
                .then(result=> res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg:error.message});
                })
        })

        .delete((req,res) => {

            Clients.destroy({where: req.params})
            .then(result=> res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({msg:error.message});
                })

        })
}