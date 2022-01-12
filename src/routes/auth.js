const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = app =>{
    const bodyParser    = require('body-parser');
    const cors          = require('cors');
    const jwt           = require('jsonwebtoken');
    var expressJWT      = require('express-jwt');
    let secret = 'some_secret'; // a secret key is set here
    const Usuario = app.db.models.Usuarios;
    const bcrypt = require('bcrypt');


    app.use(cors());
    app.options('*', cors());
    app.use(bodyParser.json({limit: '10mb', extended: true}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(expressJWT({secret: secret, algorithms:['HS256']})
        .unless({
            path:[
                '/api/login'
            ]}
        ));

    app.route('/api/login')
        .post((req,res)=>{
            let actualUser = {
                id: '',
                usuario:'',
                rol:'',
                activo:''
            };
            Usuario.findOne({where: {usuario: req.body.usuario  } })
                .then(user =>{
                    actualUser.id = user.id;
                    actualUser.usuario = user.usuario;
                    actualUser.rol = user.rol;
                    actualUser.activo = user.activo;
                    if(actualUser.activo){
                        bcrypt.compare(req.body.clave, user.clave)
                            .then(result =>{
                                if(result){
                                    let token = jwt.sign(actualUser, secret, { expiresIn: '7200s'});
                                    let loginUser = {
                                        user: actualUser,
                                        token: token
                                    }
                                    res.send(loginUser);
                                }else{
                                    res.status(401).json({status: 401, mensaje: 'usuario y/o contraseña incorectos'});
                                }
                            })
                            .catch(err =>{
                                res.status(500).json({status: 500, mensaje: 'error interno del servidor'});
                            });
                    }else{
                        res.status(403).json({status: 403, mensaje: 'usuario inactivo'});
                    }
                })
                .catch(error =>{
                    res.status(403).json({status: 403, mensaje: 'usuario y/o contraseña incorectos'});
                })

        })
}
