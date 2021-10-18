module.exports = app => {

    const Sequelize = require("sequelize");
    const Op = Sequelize.Op;
    const Productos = app.db.models.Productos;
    const Categorias = app.db.models.Categorias;

    app.route('/api/productos')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.descripcion) {
                Object.assign(whereCondition, {
                    descripcion: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Productos.descripcion')), 'LIKE', '%' + req.query.descripcion + '%')
                });
            }
            if (req.query.categoriaId) {
                Object.assign(whereCondition, {
                    categoriaId: req.query.categoriaId
                });
            }
            if (req.query.stock) {
                Object.assign(whereCondition, {
                    stock: {
                        [Op.lt]: Sequelize.col('cantidadMinima')
                    }
                });
            }
            if (req.query.activo) {
                Object.assign(whereCondition, {
                    activo: req.query.activo
                });
            }
            let order = req.query.order ? req.query.order.split(",", 2) : [];
            if (order && order[0] === 'categoria.descripcion') {
                order = [Sequelize.literal('"categoria"."descripcion"'), order[1]];
            }
            Productos.findAndCountAll({
                where: whereCondition,
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order],
                include: [{ model: Categorias, as: 'categoria' }]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error });
                });
        })
        .post((req, res) => {
            req.body.activo = true;
            Productos.create({...req.body, categoriaId: req.body.categoriaId })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Productos.update({ ...req.body, categoriaId: req.body.categoriaId }, { where: { id: req.body.id } })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/api/productos/:id')
        .get((req, res) => {
            Productos.findOne({
                where: req.params,
                include: [{ model: Categorias, as: 'categoria' }]
            })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Productos.destroy({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
