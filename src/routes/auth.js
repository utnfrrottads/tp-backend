module.exports = app =>{
    const bodyParser    = require('body-parser');
    const cors          = require('cors');
    const jwt           = require('jsonwebtoken');
    var expressJWT      = require('express-jwt');



    app.use(cors());
    app.options('*', cors());
    app.use(bodyParser.json({limit: '10mb', extended: true}));
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

    let secret = 'some_secret'; // a secret key is set here

    app.route('/api/token')

        .get((req,res)=>{
            var userData = {
                "name": "My Name",
                "id": "1234"
            }
            let token = jwt.sign(userData, secret, { expiresIn: '15s'})
            res.status(200).json({"token": token});
        });





}
