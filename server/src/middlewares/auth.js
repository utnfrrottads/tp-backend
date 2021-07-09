const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config');
const { Usuario } = require('../models/index');

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization) {
        req.usuarioVerificado = false;
    } else {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            req.usuarioVerificado = false;
        } else {
            try {
                const payload = jwt.verify(token, TOKEN_SECRET);
                const usuario = await Usuario.findById(payload._id);
                if (usuario) {
                    req.idUsuario = usuario._id;
                    req.usuarioVerificado = true;
                } else {
                    req.usuarioVerificado = false;
                }
            } catch (e) {
                req.usuarioVerificado = false;
            }
        }
    };
    next();
}

module.exports = { authenticate }
