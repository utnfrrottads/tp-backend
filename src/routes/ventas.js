module.exports = app => {

    const Ventas = app.db.models.Ventas;
    const VentasItems = app.db.models.VentasItems;
    const Clientes = app.db.models.Clientes;
    const Productos = app.db.models.Productos;
    const { Sequelize } = require("sequelize");

    app.route('/api/ventas')
        .get((req, res) => {
            const whereCondition = {};
            if (req.query.nomTarjeta) {
                Object.assign(whereCondition, {
                    nom_tarjeta: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nom_tarjeta')), 'LIKE', '%' + req.query.nomTarjeta + '%')
                });
            }
            if (req.query.numTarjeta) {
                Object.assign(whereCondition, {
                    num_tarjeta: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('num_tarjeta')), 'LIKE', '%' + req.query.numTarjeta + '%')
                });
            }
            if (req.query.dni) {
                Object.assign(whereCondition, {
                    dni: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('cliente_dni')), 'LIKE', '%' + req.query.dni + '%')
                });
            }
            const order = req.query.order ? req.query.order.split(",", 2) : [];
            Ventas.findAndCountAll({
                where: whereCondition,
                limit: req.query.limit,
                offset: req.query.offset * req.query.limit,
                order: [order],
                include: [
                    {
                        model: VentasItems, as: 'ventasItems',
                        include: {
                            model: Productos, as: 'producto'
                        }
                    },
                    {
                        model: Clientes, as: 'cliente'
                    }
                ]
            })
                .then(result => { res.json(result) })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            Ventas.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Ventas.update(req.body, { where: { cliente_dni: req.body.clienteDni } })
                .then(() => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
    app.route('/api/ventas/:id')
        .get((req, res) => {
            Ventas.findOne(
                {
                    where: req.params,
                    include: [
                        {
                            model: VentasItems, as: 'ventasItems',
                            include: {
                                model: Productos, as: 'producto'
                            }
                        },
                        {
                            model: Clientes, as: 'cliente'
                        }
                    ]
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .delete((req, res) => {
            Ventas.destroy({ where: req.params })
                .then(() => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
