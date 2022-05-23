const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/index');

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) {
        req.usuario = null;
    } else {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            req.usuario = null;
        } else {
            try {
                const payload = jwt.verify(token, process.env.TOKEN_SECRET);
                const usuario = await Usuario.findById(payload._id).select('+clave');
                if (usuario) {
                    req.usuario = usuario;
                } else {
                    req.usuario = null;
                }
            } catch (e) {
                req.usuario = null;
            }
        }
    };
    next();
}

module.exports = { authenticate }
