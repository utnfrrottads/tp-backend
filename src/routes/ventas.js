module.exports = app => {

    const Ventas = app.db.models.Ventas;
    const VentasItems = app.db.models.VentasItems;
    const Clientes = app.db.models.Clientes;
    const Productos = app.db.models.Productos;
    const { Sequelize } = require("sequelize");
    const sequelize = app.db.sequelize;

    app.route('/api/ventas')
        .get((req, res) => {
            function styleHyphenFormat(propertyName)
            {
                function upperToHyphenLower(match)
                {
                    return '_' + match.toLowerCase();
                }
                return propertyName.replace(/[A-Z]/, upperToHyphenLower);
            }
            let orden = '';
            if (req.query.order){
                orden = req.query.order.split(",", 2)
                orden = styleHyphenFormat(orden[0]) + ' ' + orden[1];
            }else{
                orden = '1 asc';
            }
            let colum = '';
            let extra = `order by ${orden} limit ? offset ?`
            let sql = ` select v.id, v.fecha,
								cliente.nombre AS "nombre", cliente.apellido AS "apellido", cliente.dni AS "dni"
								
                        from ventas AS v
                        left outer join clientes AS cliente
                        on v.cliente_dni = cliente.dni
                        left outer join ventas_items AS vi
                        on v.id = vi.venta_id
                        left outer join productos AS p
                        on vi.producto_id = p.id ` ;
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
            if(req.query.clienteId){
                colum = colum ? `cliente.dni = ? and ${colum}` : `cliente.dni = ?`;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift(req.query.clienteId);
            }
            console.log(req.query);
            sequelize.query(
                query,
                {
                    replacements: replacements
                }
            )
                .then(result => {
                    res.json({"count": result.slice(1).pop().rowCount, "rows": result.slice(1).pop().rows });
                })
                .catch(error => {
                    console.log(error);
                    res.status(412).json(error.message);
                })

        })
        .post((req, res) => {
            Ventas.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .put((req, res) => {
            Ventas.update(req.body, { where: { clienteDni: req.body.clienteDni } })
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
