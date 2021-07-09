const { GraphQLString, GraphQLInput, GraphQLInputObjectType, GraphQLObjectType, UserInputError } = require('graphql');
const { SignUpOutput } = require('./types');
const { Usuario } = require('../models/index');
const { createJwtToken } = require('../helpers/auth');
const { encryptPassword, matchPassword } = require('../helpers/encryptPassword');

const signUp = {
  type: SignUpOutput,
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
    const user = await usuario.save();
    const token = createJwtToken(usuario);
    return {
      user,
      token
    };
  }
}

const signIn = {
    type: SignUpOutput,
    description: 'SignIn',
    args: {
        nombreUsuario: { type: GraphQLString },
        clave: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const { nombreUsuario, clave } = args;
        const user = await Usuario.findOne({ nombreUsuario }).select('+clave');
        if (!user) {
            throw new Error('Nombre de usuario o clave incorrectos');
        } else {
            const claveValida = await matchPassword(clave, user.clave || '');
            if (!claveValida) {
                throw new Error('Nombre de usuario o clave incorrectos');
            } else {
                const token = createJwtToken(user);
                return {
                  user,
                  token
                }
            }
        }
    }
}

module.exports = { signUp, signIn }
