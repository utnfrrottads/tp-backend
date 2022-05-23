module.exports = app => {
    const Usuario = app.db.models.Usuarios;
    const bcrypt = require('bcrypt');
    const Sequelize = require("sequelize");
    const BCRYPT_SALT_ROUNDS = 10;
    const sequelize = app.db.sequelize;

    app.route('/api/usuarios')
        .get((req, res) => {
            let orden = '';
            if (req.query.order){
                orden = req.query.order.replace(',',' ');
            }else{
                orden = '1 asc';
            }
            let colum = '';
            let sql = `SELECT * FROM usuarios` ;
            let extra = ` order by ${orden} limit ? offset ?`
            let query = sql + extra;
            let replacements = [req.query.limit,req.query.offset * req.query.limit];
            if(req.query.activo){
                colum = colum ? `activo = true and ${colum}` : `activo = true`;
                query = `${sql} where ${colum} ${extra}`;
            }
            if(req.query.rol){
                colum = colum ? `rol = ? and ${colum}` : `rol = ?`;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift(req.query.rol);
            }
            if(req.query.usuario){
                colum = colum ? `usuario ilike ? and ${colum}` : `usuario ilike ?`;
                query = `${sql} where ${colum} ${extra}`;
                replacements.unshift('%'+req.query.usuario+'%');
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
                    res.status(412).json({msg: error.message})
                });
        })
        .post((req, res) => {
            req.body.activo = true;
            bcrypt.hash(req.body.clave, BCRYPT_SALT_ROUNDS)
                .then(hashedPassword => {
                    req.body.clave = hashedPassword;
                    Usuario.create(req.body)
                        .then(result => {
                            res.json(result);
                        })
                        .catch(error => {
                            res.status(412).json(error);
                        });
                })
                .catch(error => {
                    res.status(410).json({ msg: error.message });
                });
        })
        .patch((req, res) => {
            Usuario.update({
                rol: req.body.rol,
                activo: req.body.activo
            },
                {
                    where: { id: req.body.id }
                })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
                .catch(error => {
                    res.status(410).json({ msg: error.message })
                })
        });

    app.route('/api/usuarios/:id')
        .get((req, res) => {
            Usuario.findOne({
                where: req.params,
                attributes: { exclude: ['clave'] }
            })
                .then((result) => {
                    res.json(result)
                })
                .catch(error => {
                    res.status(412).json({ msg: error.message })
                })
        })
        .delete((req, res) => {
            Usuario.destroy({ where: req.params })
                .then(() => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
}
