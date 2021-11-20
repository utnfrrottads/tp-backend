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
   /* app.use(expressJWT({secret: secret, algorithms:['HS256']})
        .unless({
            path:[
                '/api/token/sign'
            ]}
        ));*/

    app.route('/api/login')
        .post((req,res)=>{
            Usuario.findOne({where: {usuario: req.body.usuario}})
                .then(user =>{
                    return bcrypt.compare(req.body.clave, user.clave);
                })
                .then(result=>{
                    if(!result){
                        res.status(403).json({msg:'contraseña incorrecta'})
                    }
                    res.send(result);
                })
                .catch(error =>{
                    res.status(412).json({msg:error.message})
                })
        })

    app.route('/api/token/sign')
        .get((req,res)=>{
            var userData = {
                "name": "My Name",
                "id": "1234"
            }
            let token = jwt.sign(userData, secret, { expiresIn: '60s'})
            res.status(200).json({"token": token});
        });

    app.route('/api/token/path1')
        .get((req, res) => {
            res.status(200)
                .json({
                    "succes": true,
                    "msg":"Secret access granted"
                });
        });
}
