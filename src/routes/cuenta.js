
module.exports = app => {

    const Usuario = app.db.models.Usuarios;
    const bcrypt = require('bcrypt');
    const BCRYPT_SALT_ROUNDS = 10;

    app.route('/api/cuenta/cambiar-clave')
        .patch((req,res)=>{
            Usuario.findOne({where: {id: req.body.id}})
                .then(user =>{
                    bcrypt.compare(req.body.claveVieja, user.clave)
                        .then(result => {
                            if(!result){
                                res.status(418).json({msg:`El campo "Contraseña anterior" no coincide con la contraseña actual del usuario: ${user.usuario}`});
                            }else{
                                if(req.body.claveVieja === req.body.claveNueva){
                                    res.status(418).json({msg:'La "Contraseña anterior" no debe coincidir con la "Contraseña nueva"'});
                                }else{
                                    bcrypt.hash(req.body.claveNueva, BCRYPT_SALT_ROUNDS)
                                        .then(hashedPassword => {
                                            const usuario = {id: req.body.id,clave: hashedPassword};
                                            Usuario.update(usuario,{where: {id: usuario.id}})
                                                .then(result2 => res.json({msg:`La clave se guardo correctamente ${result2}`}))
                                                .catch(error => {
                                                    res.status(412).json({msg: `Error, algo paso: ${error.message}`});
                                                });
                                        })
                                        .catch(error => {
                                            res.status(412).json({msg:error.message});
                                        });
                                }
                            }
                        })
                })
                .catch(error => {
                    res.status(412).json({msg: error.message});
                })
        })
}
