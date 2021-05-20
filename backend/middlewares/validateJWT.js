const jwt = require('jsonwebtoken');

const validateJWT =  (req , res, next) =>{
//Lee el token
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'There is no token in the request'
        })
    }
//Verifica el token
    try {
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Wrong token'
        });
    }
}

module.exports = {
    validateJWT,
}