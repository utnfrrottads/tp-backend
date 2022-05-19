module.exports = app => {

    const Proveedores = app.db.models.Proveedores;
    const sequelize = app.db.sequelize;
    app.route('/api/proveedores')
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
            let sql = `SELECT "Proveedores".id, "Proveedores".razon_social AS "razonSocial", 
                        "Proveedores".cuit_dni AS "cuitDni", "Proveedores".telefono,
                        "Proveedores".email, "Proveedores".direccion, "Proveedores".activo
                        FROM proveedores AS "Proveedores"
                        ` ;
            let extra = `order by ${orden} limit ? offset ?`
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
            if(req.query.cuitDni){
                colum = colum ? `cuit_dni ilike ? and ${colum}` : `cuit_dni ilike ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%'+req.query.cuitDni+'%');
            }
            if(req.query.razonSocial){
                colum = colum ? `razon_social ilike ? and ${colum}` : `razon_social ilike ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%'+req.query.razonSocial+'%');
            }
            if(req.query.direccion){
                colum = colum ? `direccion ilike ? and ${colum}` : `direccion ilike ? `;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%'+req.query.direccion+'%');
            }
            if(req.query.activo){
                colum = colum ? `activo = true and ${colum}` : `activo = true `;
                query = `${sql} where ${colum} ${extra}`;
            }
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
                    res.status(412).json(error.message);
                })
        })
        .post((req, res) => {
            req.body.activo = true;
            Proveedores.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(410).json({ msg: error.message });
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

