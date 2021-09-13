module.exports = app => {

    const Sequelize = require("sequelize");
    const Categorias = app.db.models.Categorias;

    app.route('/api/categorias-productos')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.descripcion) {
                Object.assign(whereCondition, {
                    descripcion: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('descripcion')), 'LIKE', '%' + req.query.descripcion + '%')
                });
            }
            if (req.query.activa) {
                Object.assign(whereCondition, {
                    activa: req.query.activa
                });
            }
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            Categorias.findAndCountAll({
                where: whereCondition,
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order],
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            req.body.activa = true;
            Categorias.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Categorias.update(req.body, { where: {id: req.body.id} })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/categorias-productos/:id')
        .get((req, res) => {
            Categorias.findOne({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Categorias.destroy({ where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
