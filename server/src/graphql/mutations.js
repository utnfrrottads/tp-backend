const { GraphQLString } = require('graphql');
const { LoginOutput } = require('./types');
const { Usuario } = require('../models/index');
const { createJwtToken } = require('../helpers/auth');
const { encryptPassword, matchPassword } = require('../helpers/encryptPassword');

const signUp = {
  type: LoginOutput,
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
    const usuarioGuardado = await usuario.save();
    const token = createJwtToken(usuarioGuardado);
    return {
      usuario: usuarioGuardado,
      token
    }
  }
}

const signIn = {
  type: LoginOutput,
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
      const claveValida = await matchPassword(clave, usuario.clave);
      if (!claveValida) {
        throw new Error('Nombre de usuario o clave incorrectos');
      } else {
        const token = createJwtToken(usuario);
        return {
          usuario,
          token
        }
      }
    }
  }
}

const updateUsuario = {
  type: LoginOutput,
  description: 'Update Usuario',
  args: {
    nombreUsuario: { type: GraphQLString },
    clave: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString }
  },
  async resolve(parent, args, { usuarioVerificado, idUsuario }) {
    if (!usuarioVerificado) {
      throw new Error('Acceso no autorizado');
    } else {
      const usuario = await Usuario.findById(idUsuario).select('+clave');
      if (!usuario) {
        throw new Error('Acceso no autorizado');
      } else {
        const { nombreUsuario, clave, nombreApellido, email, habilidades } = args;
        const claveValida = await matchPassword(clave, usuario.clave);
        if (!claveValida) {
          throw new Error('Clave incorrecta');
        } else {
          usuario.nombreUsuario = nombreUsuario;
          usuario.nombreApellido = nombreApellido;
          usuario.email = email;
          usuario.habilidades = habilidades;
          const usuarioGuardado = await usuario.save();
          const token = createJwtToken(usuarioGuardado);
          return {
            usuario: usuarioGuardado,
            token
          }
        }
      }
    }
  }
}

const cambiarClave = {
  type: LoginOutput,
  description: 'Cambiar Clave',
  args: {
    claveActual: { type: GraphQLString },
    claveNueva: { type: GraphQLString }
  },
  async resolve(parent, args, { usuarioVerificado, idUsuario }) {
    if (!usuarioVerificado) {
      throw new Error('Acceso no autorizado');
    } else {
      const usuario = await Usuario.findById(idUsuario).select('+clave');
      if (!usuario) {
        throw new Error('Acceso no autorizado');
      } else {
        const { claveActual, claveNueva } = args;
        const claveValida = await matchPassword(claveActual, usuario.clave);
        if (!claveValida) {
          throw new Error('Clave actual incorrecta');
        } else {
          usuario.clave = await encryptPassword(claveNueva);
          const usuarioGuardado = await usuario.save();
          const token = createJwtToken(usuarioGuardado);
          return {
            usuario: usuarioGuardado,
            token
          }
        }
      }
    }
  }
}

module.exports = { signUp, signIn, updateUsuario, cambiarClave }
