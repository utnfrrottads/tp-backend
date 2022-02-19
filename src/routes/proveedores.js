module.exports = app => {

    const Sequelize = require("sequelize");
    const Proveedores = app.db.models.Proveedores;

    app.route('/api/proveedores')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.razonSocial) {
                Object.assign(whereCondition, {
                    razonSocial: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Proveedores.razon_social')), 'LIKE', '%' + req.query.razonSocial + '%')
                });
            }
            if (req.query.telefono) {
                Object.assign(whereCondition, {
                    telefono: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Proveedores.telefono')), 'LIKE', '%' + req.query.telefono + '%')
                });
            }
            if (req.query.email) {
                Object.assign(whereCondition, {
                    email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Proveedores.email')), 'LIKE', '%' + req.query.email + '%')
                });
            }
            if (req.query.direccion) {
                Object.assign(whereCondition, {
                    direccion: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Proveedores.direccion')), 'LIKE', '%' + req.query.direccion + '%')
                });
            }
            if (req.query.activo) {
                Object.assign(whereCondition, {
                    activo: req.query.activo
                });
            }
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            Proveedores.findAndCountAll({
                where: whereCondition,
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error });
                });
        })
        .post((req, res) => {
            req.body.activo = true;
            Proveedores.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Proveedores.update(req.body, { where: { id: req.body.id } })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/proveedores/:id')
        .get((req, res) => {
            Proveedores.findOne({
                where: req.params
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Proveedores.destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
