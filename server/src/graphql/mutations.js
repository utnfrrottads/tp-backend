const { GraphQLString, GraphQLID, GraphQLFloat } = require('graphql');
const { LoginOutput, TypeCategoria, TypeServicio } = require('./types');
const { Usuario, Categoria, Nivel, Contrato, Servicio } = require('../models/index');
const { createJwtToken } = require('../helpers/auth');
const { encryptPassword, matchPassword } = require('../helpers/encryptPassword');

const signUp = {
  description: 'Crear Cuenta',
  type: LoginOutput,
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
    const usuario = new Usuario({ nombreUsuario, clave: claveEncriptada, nombreApellido, email, habilidades, isAdministrador: false });
    const usuarioGuardado = await usuario.save();
    const token = createJwtToken(usuarioGuardado);
    return {
      usuario: usuarioGuardado,
      token
    }
  }
}

const signIn = {
  description: 'Iniciar Sesión',
  type: LoginOutput,
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
  description: 'Actualizar Usuario',
  type: LoginOutput,
  args: {
    nombreUsuario: { type: GraphQLString },
    clave: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
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

const cambiarClave = {
  description: 'Cambiar Clave',
  type: LoginOutput,
  args: {
    claveActual: { type: GraphQLString },
    claveNueva: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
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

const addCategoria = {
  description: 'Agregar Categoria',
  type: TypeCategoria,
  args: {
    descripcion: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { descripcion } = args;
      const categoria = new Categoria({ descripcion });
      return await categoria.save();
    }
  }
}

const deleteCategoria = {
  description: 'Eliminar Categoria',
  type: TypeCategoria,
  args: {
    _id: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { _id } = args;
      return await Categoria.findByIdAndDelete(_id);
    }
  }
}

const updateCategoria = {
  description: 'Actualizar Categoria',
  type: TypeCategoria,
  args: {
    _id: { type: GraphQLString },
    descripcion: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { _id, descripcion } = args;
      const categoria = await Categoria.findById(_id);
      categoria.descripcion = descripcion;
      return categoria.save();
    }
  }
}

const publishService = {
  description: 'Publicar servicio',
  type: TypeServicio,
  args: {
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    idCategoria: { type: GraphQLID },
    precio: { type: GraphQLFloat }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { titulo, descripcion, idCategoria, precio } = args;
      const servicio = new Servicio({ titulo, descripcion, idCategoria, precio, idUsuario: usuario._id });
      return await servicio.save();
    }
  }
}

module.exports = {
  signUp,
  signIn,
  updateUsuario,
  cambiarClave,
  addCategoria,
  deleteCategoria,
  updateCategoria,
  publishService
}
