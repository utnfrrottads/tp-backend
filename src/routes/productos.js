module.exports = app => {

    const Sequelize = require("sequelize");
    const Productos = app.db.models.Productos;

    app.route('/api/productos')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.descripcion) {
                Object.assign(whereCondition, {
                    descripcion: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('descripcion')), 'LIKE', '%' + req.query.descripcion + '%')
                });
            }
            if (req.query.requiereStock) {
                Object.assign(whereCondition, {
                    stock: {
                        [Op.lt]: Sequelize.col('cantidadMinima')
                    }
                });
            }
            if (req.query.categoriaId) {
                Object.assign(whereCondition, {
                    categoriaId: req.query.categoriaId
                });
            }
            // TODO: proveedores
            if (req.query.activo) {
                Object.assign(whereCondition, {
                    activo: req.query.activo
                });
            }
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            Productos.findAndCountAll({
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
            req.body.activo = true;
            Productos.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Productos.update(req.body, { where: { id: req.body.id } })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/productos/:id')
        .get((req, res) => {
            Productos.findOne({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Productos.destroy({ where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
