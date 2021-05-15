const { GraphQLString } = require('graphql');
const { } = require('./types');
const { Usuario } = require('../models/index');
const { createJwtToken } = require('../helpers/auth');
const { encryptPassword, matchPassword } = require('../helpers/encryptPassword');

const signUp = {
    type: GraphQLString,
    description: 'SignUp',
    args: {
        nombreUsuario: { type: GraphQLString },
        clave: { type: GraphQLString },
        nombreApellido: { type: GraphQLString },
        email: { type: GraphQLString },
        habilidades: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { nombreUsuario, clave, nombreApellido, email, habilidades } = args;
        const claveEncriptada = await encryptPassword(clave);
        const usuario = new Usuario({ nombreUsuario, clave: claveEncriptada, nombreApellido, email, habilidades });
        await usuario.save();

        const token = createJwtToken(usuario);
        return token;
    }
}

const signIn = {
    type: GraphQLString,
    description: 'SignIn',
    args: {
        nombreUsuario: { type: GraphQLString },
        clave: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { nombreUsuario, clave } = args;
        const usuario = await Usuario.findOne({ nombreUsuario }).select('+clave');
        if (!usuario) {
            throw new Error('Nombre de usuario o clave incorrectos');
        } else {
            const claveValida = await matchPassword(clave, usuario.clave || "");
            if (!claveValida) {
                throw new Error('Nombre de usuario o clave incorrectos');
            } else {
                const token = createJwtToken(usuario);
                return token;
            }
        }
    }
}

module.exports = { signUp, signIn }
