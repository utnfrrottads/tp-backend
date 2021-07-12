const {} = require('graphql');
const { TypeUsuario } = require('./types');
const { Usuario } = require('../models/index');

const perfil = {
    description: 'Profile',
    type: TypeUsuario,
    resolve(parent, args, { usuarioVerificado, idUsuario }) {
        if (!usuarioVerificado) {
            throw new Error('Acceso no autorizado');
        } else {
            return Usuario.findById(idUsuario);
        }
    }
}

module.exports = { perfil }
