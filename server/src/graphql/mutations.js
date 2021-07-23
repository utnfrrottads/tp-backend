const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
const {
  LoginOutput,
  TypeNivel,
  TypeCategoria,
  TypeServicio,
} = require("./types");
const {
  Usuario,
  Categoria,
  Nivel,
  Servicio,
  Moneda,
  Precio,
} = require("../models/index");
const { createJwtToken } = require("../helpers/auth");
const {
  encryptPassword,
  matchPassword,
} = require("../helpers/encryptPassword");

const signUp = {
  description: "Crear Cuenta",
  type: LoginOutput,
  args: {
    nombreUsuario: { type: GraphQLString },
    clave: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { nombreUsuario, clave, nombreApellido, email, habilidades } = args;
    if (
      nombreUsuario &&
      nombreUsuario.length >= 6 &&
      nombreUsuario.length <= 25 &&
      clave &&
      clave.length >= 8 &&
      clave.length <= 50 &&
      nombreApellido &&
      nombreApellido.trim().length <= 50 &&
      email &&
      email.length <= 50 &&
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      ) &&
      (!habilidades || (habilidades && habilidades.trim().length <= 300))
    ) {
      if (!(await Usuario.findOne({ nombreUsuario }))) {
        const nivelMinimo = await Nivel.findOne({ nro: 1, contratosMinimos: 0 })
        if (nivelMinimo) {
          const claveEncriptada = await encryptPassword(clave);
          const usuario = new Usuario({
            nombreUsuario,
            clave: claveEncriptada,
            nombreApellido,
            email,
            habilidades,
            idNivel: nivelMinimo._id
          });
          const usuarioGuardado = await usuario.save();
          const token = createJwtToken(usuarioGuardado);
          const monedas = await Moneda.find();
          return {
            usuario: usuarioGuardado,
            token,
            monedas
          };
        } else {
          throw new Error("No se ha registrado el nivel mínimo de contratos");
        }
      } else {
        throw new Error("El nombre de usuario ya se encuentra registrado");
      }
    } else {
      throw new Error("Ingrese todos los datos requeridos en el formato correcto");
    }
  },
};

const signIn = {
  description: "Iniciar Sesión",
  type: LoginOutput,
  args: {
    nombreUsuario: { type: GraphQLString },
    clave: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const { nombreUsuario, clave } = args;
    const usuario = await Usuario.findOne({ nombreUsuario }).select("+clave");
    if (!usuario) {
      throw new Error("Nombre de usuario y/o clave incorrectos");
    } else {
      const claveValida = await matchPassword(clave, usuario.clave);
      if (!claveValida) {
        throw new Error("Nombre de usuario y/o clave incorrectos");
      } else {
        const token = createJwtToken(usuario);
        const monedas = await Moneda.find();
        return {
          usuario,
          token,
          monedas
        };
      }
    }
  },
};

const updateUsuario = {
  description: "Actualizar Usuario",
  type: LoginOutput,
  args: {
    nombreUsuario: { type: GraphQLString },
    clave: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      const { nombreUsuario, clave, nombreApellido, email, habilidades } = args;
      const claveValida = await matchPassword(clave, usuario.clave);
      if (!claveValida) {
        throw new Error("Clave incorrecta");
      } else {
        if (
          nombreUsuario &&
          nombreUsuario.length >= 6 &&
          nombreUsuario.length <= 25 &&
          clave &&
          clave.length >= 8 &&
          clave.length <= 50 &&
          nombreApellido &&
          nombreApellido.trim().length <= 50 &&
          email &&
          email.length <= 50 &&
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          ) &&
          (!habilidades || (habilidades && habilidades.trim().length <= 300))
        ) {
          if (
            usuario.nombreApellido === nombreUsuario ||
            !(await Usuario.findOne({ nombreUsuario }))
          ) {
            usuario.nombreUsuario = nombreUsuario;
            usuario.nombreApellido = nombreApellido;
            usuario.email = email;
            usuario.habilidades = habilidades;
            const usuarioGuardado = await usuario.save();
            const token = createJwtToken(usuarioGuardado);
            return {
              usuario: usuarioGuardado,
              token
            };
          } else {
            throw new Error("El nombre de usuario ya se encuentra registrado");
          }
        } else {
          throw new Error(
            "Ingrese todos los datos requeridos en el formato correcto"
          );
        }
      }
    }
  },
};

const cambiarClave = {
  description: "Cambiar Clave",
  type: LoginOutput,
  args: {
    claveActual: { type: GraphQLString },
    claveNueva: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      const { claveActual, claveNueva } = args;
      const claveValida = await matchPassword(claveActual, usuario.clave);
      if (!claveValida) {
        throw new Error("Clave actual incorrecta");
      } else {
        if (claveNueva && claveNueva.length >= 8 && claveNueva.length <= 50) {
          usuario.clave = await encryptPassword(claveNueva);
          const usuarioGuardado = await usuario.save();
          const token = createJwtToken(usuarioGuardado);
          return {
            usuario: usuarioGuardado,
            token
          };
        } else {
          throw new Error("Ingrese una clave nueva en el formato correcto");
        }
      }
    }
  },
};

const addNivel = {
  description: "Agregar Nivel",
  type: TypeNivel,
  args: {
    nro: { type: GraphQLInt },
    contratosMinimos: { type: GraphQLInt },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { nro, contratosMinimos } = args;
      if (nro > 0 && contratosMinimos >= 0) {
        const nivelMayor = (await Nivel.find().sort({ nro: -1 }).limit(1))[0];
        if (
          (!nivelMayor && contratosMinimos === 0) ||
          (nivelMayor &&
            nivelMayor.nro + 1 === nro &&
            contratosMinimos > nivelMayor.contratosMinimos)
        ) {
          const nivel = new Nivel({ nro, contratosMinimos });
          return await nivel.save();
        } else {
          throw new Error(
            "Número de nivel y/o número de contratos mínimos incorrectos"
          );
        }
      } else {
        throw new Error("Ingrese un nivel en el formato correcto");
      }
    }
  },
};

const deleteNivel = {
  description: "Eliminar Nivel",
  type: TypeNivel,
  args: {
    _id: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { _id } = args;
      const nivelMayor = (await Nivel.find().sort({ nro: -1 }).limit(1))[0];
      if (!nivelMayor || (nivelMayor && nivelMayor._id.toString() === _id)) {
        return await Nivel.findByIdAndDelete(_id);
      } else {
        throw new Error("Solo se puede eliminar el mayor nivel");
      }
    }
  },
};

const updateNivel = {
  description: "Actualizar Nivel",
  type: TypeNivel,
  args: {
    _id: { type: GraphQLString },
    nro: { type: GraphQLInt },
    contratosMinimos: { type: GraphQLInt },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { _id, nro, contratosMinimos } = args;
      const nivel = await Nivel.findOne({ _id, nro });
      if (nivel) {
        if (nro > 0 && contratosMinimos >= 0) {
          const nivelInferior = await Nivel.findOne({ nro: nivel.nro - 1 });
          const nivelSuperior = await Nivel.findOne({ nro: nivel.nro + 1 });
          if (
            ((!nivelInferior && contratosMinimos === 0) ||
              (nivelInferior &&
                contratosMinimos > nivelInferior.contratosMinimos)) &&
            (!nivelSuperior ||
              (nivelSuperior &&
                contratosMinimos < nivelSuperior.contratosMinimos))
          ) {
            nivel.contratosMinimos = contratosMinimos;
            return nivel.save();
          } else {
            throw new Error(
              "El número de contratos mínimos debe estar entre el número del nivel inferior y superior del nivel que se está editando"
            );
          }
        } else {
          throw new Error("Ingrese un nivel en el formato correcto");
        }
      } else {
        throw new Error("El nivel que desea actualizar no existe");
      }
    }
  },
};

const addCategoria = {
  description: "Agregar Categoria",
  type: TypeCategoria,
  args: {
    descripcion: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { descripcion } = args;
      if (descripcion && descripcion.trim().length < 30) {
        if (!(await Categoria.findOne({ descripcion: descripcion.trim() }))) {
          const categoria = new Categoria({ descripcion });
          return await categoria.save();
        } else {
          throw new Error("La categoría ingresada ya se encuentra registrada");
        }
      } else {
        throw new Error("Ingrese una categoría en el formato correcto");
      }
    }
  },
};

const deleteCategoria = {
  description: "Eliminar Categoria",
  type: TypeCategoria,
  args: {
    _id: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { _id } = args;
      return await Categoria.findByIdAndDelete(_id);
    }
  },
};

const updateCategoria = {
  description: "Actualizar Categoria",
  type: TypeCategoria,
  args: {
    _id: { type: GraphQLString },
    descripcion: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario || !usuario.isAdministrador) {
      throw new Error("Acceso no autorizado");
    } else {
      const { _id, descripcion } = args;
      const categoria = await Categoria.findById(_id);
      if (categoria) {
        if (descripcion && descripcion.trim().length < 30) {
          if (
            (descripcion === categoria.descripcion) ||
            !(await Categoria.findOne({ descripcion: descripcion.trim() }))
          ) {
            categoria.descripcion = descripcion;
            return categoria.save();
          } else {
            throw new Error("La categoría ingresada ya se encuentra registrada");
          }
        } else {
          throw new Error("Ingrese una categoría en el formato correcto");
        }
      } else {
        throw new Error("La categoría que desea actualizar no existe");
      }
    }
  },
};

const publishService = {
  description: "Publicar servicio",
  type: TypeServicio,
  args: {
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    idCategoria: { type: GraphQLID },
    valor: { type: GraphQLFloat },
    idMoneda: { type: GraphQLID },
  },
  async resolve(parent, args, { usuario }) {
    const { titulo, descripcion, idCategoria, valor, idMoneda } = args;
    if (
      titulo
      && titulo.trim().length <= 30
      && descripcion
      && descripcion.trim().length <= 300
      && idCategoria
      && valor
      && valor >= 0
      && idMoneda
    ) {
      const servicio = new Servicio({
        titulo,
        descripcion,
        precio: { valor, idMoneda },
        idCategoria,
        idUsuario: usuario._id,
      });
      return await servicio.save();
    } else {
      throw new Error("Ingrese todos los datos requeridos en el formato correcto");
    }
  },
};

module.exports = {
  signUp,
  signIn,
  updateUsuario,
  cambiarClave,
  addNivel,
  deleteNivel,
  updateNivel,
  addCategoria,
  deleteCategoria,
  updateCategoria,
  publishService,
};
