const { GraphQLString, GraphQLID, GraphQLInt } = require('graphql');
const { LoginOutput, TypeNivel, TypeCategoria } = require('./types');
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
    if (
      nombreUsuario && nombreUsuario.length >= 6 && nombreUsuario.length <= 25 &&
      clave && clave.length >= 8 && clave.length <= 50 &&
      nombreApellido && nombreApellido.trim().length <= 50 &&
      email && email.length <= 50 && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) &&
      (!habilidades || (habilidades && habilidades.trim().length <= 300))
    ) {
      if (!await Usuario.findOne({ nombreUsuario })) {
        const claveEncriptada = await encryptPassword(clave);
        const usuario = new Usuario({ nombreUsuario, clave: claveEncriptada, nombreApellido, email, habilidades });
        const usuarioGuardado = await usuario.save();
        const token = createJwtToken(usuarioGuardado);
        return {
          usuario: usuarioGuardado,
          token
        }
      } else {
        throw new Error('El nombre de usuario ya se encuentra registrado');
      }
    } else {
      throw new Error('Ingrese todos los datos requeridos en el formato correcto');
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
      throw new Error('Nombre de usuario y/o clave incorrectos');
    } else {
      const claveValida = await matchPassword(clave, usuario.clave);
      if (!claveValida) {
        throw new Error('Nombre de usuario y/o clave incorrectos');
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
        if (
          nombreUsuario && nombreUsuario.length >= 6 && nombreUsuario.length <= 25 &&
          clave && clave.length >= 8 && clave.length <= 50 &&
          nombreApellido && nombreApellido.trim().length <= 50 &&
          email && email.length <= 50 && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) &&
          (!habilidades || (habilidades && habilidades.trim().length <= 300))
        ) {
          if (usuario.nombreApellido === nombreUsuario || !await Usuario.findOne({ nombreUsuario })) {
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
          } else {
            throw new Error('El nombre de usuario ya se encuentra registrado');
          }
        } else {
          throw new Error('Ingrese todos los datos requeridos en el formato correcto');
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
        if (claveNueva && claveNueva.length >= 8 && claveNueva.length <= 50) {
          usuario.clave = await encryptPassword(claveNueva);
          const usuarioGuardado = await usuario.save();
          const token = createJwtToken(usuarioGuardado);
          return {
            usuario: usuarioGuardado,
            token
          }
        } else {
          throw new Error('Ingrese una clave nueva en el formato correcto');
        }
      }
    }
  }
}

const addNivel = {
  description: 'Agregar Nivel',
  type: TypeNivel,
  args: {
    nro: { type: GraphQLInt },
    contratosMinimos: { type: GraphQLInt }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { nro, contratosMinimos } = args;
      if (descripcion && descripcion.trim().length < 30) {
        if (!await Categoria.findOne({ descripcion: { $regex: descripcion.trim(), $options: 'i' } })) {
          const categoria = new Categoria({ descripcion });
          return await categoria.save();
        } else {
          throw new Error('La categoría ingresada ya se encuentra registrada');
        }
      } else {
        throw new Error('Ingrese una categoría en el formato correcto');
      }
    }
  }
}

const deleteNivel = {
  description: 'Eliminar Nivel',
  type: TypeNivel,
  args: {
    _id: { type: GraphQLString }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { _id } = args;
      return await Nivel.findByIdAndDelete(_id);
    }
  }
}

const updateNivel = {
  description: 'Actualizar Nivel',
  type: TypeNivel,
  args: {
    _id: { type: GraphQLString },
    nro: { type: GraphQLInt },
    contratosMinimos: { type: GraphQLInt }
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error('Acceso no autorizado');
    } else {
      const { _id, descripcion } = args;
      const categoria = await Categoria.findById(_id);
      if (categoria) {
        if (descripcion && descripcion.trim().length < 30) {
          if (descripcion === categoria.descripcion || !await Categoria.findOne({ descripcion: { $regex: descripcion.trim(), $options: 'i' } })) {
            categoria.descripcion = descripcion;
            return categoria.save();
          } else {
            throw new Error('La categoría ingresada ya se encuentra registrada');
          }
        } else {
          throw new Error('Ingrese una categoría en el formato correcto');
        }
      } else {
        throw new Error('La categoría que desea actualizar no existe');
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
      if (descripcion && descripcion.trim().length < 30) {
        if (!await Categoria.findOne({ descripcion: { $regex: descripcion.trim(), $options: 'i' } })) {
          const categoria = new Categoria({ descripcion });
          return await categoria.save();
        } else {
          throw new Error('La categoría ingresada ya se encuentra registrada');
        }
      } else {
        throw new Error('Ingrese una categoría en el formato correcto');
      }
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
      if (categoria) {
        if (descripcion && descripcion.trim().length < 30) {
          if (descripcion === categoria.descripcion || !await Categoria.findOne({ descripcion: { $regex: descripcion.trim(), $options: 'i' } })) {
            categoria.descripcion = descripcion;
            return categoria.save();
          } else {
            throw new Error('La categoría ingresada ya se encuentra registrada');
          }
        } else {
          throw new Error('Ingrese una categoría en el formato correcto');
        }
      } else {
        throw new Error('La categoría que desea actualizar no existe');
      }
    }
  }
}

module.exports = { signUp, signIn, updateUsuario, cambiarClave, addNivel, deleteNivel, updateNivel, addCategoria, deleteCategoria, updateCategoria }
