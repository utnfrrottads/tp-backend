const { createJwtToken } = require("../helpers/auth");
const { encryptPassword, matchPassword } = require("../helpers/encryptPassword");
const validator = require('validator');
const {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
} = require("graphql");
const {
  LoginOutput,
  TypeUsuario,
  TypeNivel,
  TypeCategoria,
  TypeServicio,
  TypeContrato,
  TypeNotificacion,
} = require("./types");
const {
  Usuario,
  Categoria,
  Nivel,
  Servicio,
  Moneda,
  Contrato,
  Notificacion
} = require("../models/index");
const client = require('../elasticsearch/elasticsearch');
const Mensaje = require("../models/Mensaje");

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
  async resolve(parent, { nombreUsuario, clave, nombreApellido, email, habilidades }) {
    if (
      nombreUsuario &&
      nombreUsuario.length >= 6 &&
      nombreUsuario.length <= 25 &&
      clave &&
      clave.length >= 8 &&
      clave.length <= 50 &&
      nombreApellido &&
      nombreApellido.trim().length <= 100 &&
      email &&
      email.length <= 320 &&
      validator.isEmail(email) &&
      (!habilidades || (habilidades && habilidades.trim().length <= 350))
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
          return {
            usuario: usuarioGuardado,
            token
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
  async resolve(parent, { nombreUsuario, clave }) {
    const usuario = await Usuario.findOne({ nombreUsuario }).select("+clave");
    if (!usuario) {
      throw new Error("Nombre de usuario y/o clave incorrectos");
    } else {
      const claveValida = await matchPassword(clave, usuario.clave);
      if (!claveValida) {
        throw new Error("Nombre de usuario y/o clave incorrectos");
      } else {
        const token = createJwtToken(usuario);
        return {
          usuario,
          token
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
  async resolve(parent, { nombreUsuario, clave, nombreApellido, email, habilidades }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
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
          nombreApellido.trim().length <= 100 &&
          email &&
          email.length <= 320 &&
          validator.isEmail(email) &&
          (!habilidades || (habilidades && habilidades.trim().length <= 350))
        ) {
          if (
            usuario.nombreUsuario === nombreUsuario ||
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

const deleteAccount = {
  description: "Eliminar cuenta",
  type: TypeUsuario,
  args: {
    _id: { type: GraphQLString },
  },
  async resolve(parent, args, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      let idsServicio = [];
      (await Servicio.find({ idUsuario: usuario._id }).select('_id')).forEach(serv => {
        idsServicio.push(serv._id);
      });
      await Contrato.deleteMany({ idServicio: idsServicio });

      await Contrato.deleteMany({ idUsuario: usuario._id });

      await Servicio.deleteMany({ idUsuario: usuario._id });
      
      await client.deleteByQuery({
        index: 'servicios',
        body: {
          query: {
            match: {
              idUsuario: usuario._id
            }
          }
        }
      });

      return await Usuario.findByIdAndDelete(usuario._id);
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
  async resolve(parent, { claveActual, claveNueva }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
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

const updateProfileImage = {
  description: "Actualizar Foto Perfil",
  type: TypeUsuario,
  args: {
    fotoPerfil: { type: GraphQLString },
  },
  async resolve(parent, { fotoPerfil }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      usuario.fotoPerfil = fotoPerfil;
      return await usuario.save();
    }
  },
};

const deleteProfileImage = {
  description: "Eliminar Foto Perfil",
  type: TypeUsuario,
  async resolve(parent, { }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      usuario.fotoPerfil = undefined;
      return await usuario.save();
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
    valor: { type: GraphQLFloat },
    idMoneda: { type: GraphQLID },
    ubicacion: { type: GraphQLString },
    idCategoria: { type: GraphQLID },
  },
  async resolve(parent, { titulo, descripcion, valor, idMoneda, ubicacion, idCategoria }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      if (
        titulo
        && titulo.trim().length <= 30
        && descripcion
        && descripcion.trim().length <= 300
        && ((valor && valor >= 0) || (!valor && valor == 0))
        && idMoneda
        && ubicacion
        && ubicacion.trim().length <= 100
        && idCategoria
      ) {
        let servicio = new Servicio({
          titulo,
          descripcion,
          precio: { valor, idMoneda },
          ubicacion,
          fechaHoraPublicacion: new Date(),
          idCategoria,
          idUsuario: usuario._id,
        });

        servicio = await servicio.save();

        client.index({
          index: 'servicios',
          id: servicio._id.toString(),
          body: {
            titulo: servicio.titulo,
            descripcion: servicio.descripcion,
            precio: {
              valor: servicio.precio.valor,
              idMoneda: servicio.precio.idMoneda,
            },
            ubicacion: servicio.ubicacion,
            fechaHoraPublicacion: servicio.fechaHoraPublicacion,
            idCategoria: servicio.idCategoria,
            idUsuario: servicio.idUsuario,
          },
        });

        return servicio;
      } else {
        throw new Error("Ingrese todos los datos requeridos en el formato correcto");
      }
    }
  },
};

const signContract = {
  description: "Firmar contrato",
  type: TypeContrato,
  args: {
    idServicio: { type: GraphQLID },
  },
  async resolve(parent, { idServicio }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      if (idServicio) {
        const servicio = await Servicio.findById(idServicio);
        if (servicio.idUsuario != usuario._id) {
          const contrato = new Contrato({
            fecha: new Date(),
            idServicio,
            idUsuario: usuario._id,
            estado: "Contratado",
          });
          await contrato.save();

          const notificacion = new Notificacion({
            descripcion: 'El usuario ' + usuario.nombreUsuario + ' firmó contrato por su servicio: ' + servicio.titulo,
            link: '/servicio/' + servicio._id,
            fechaHora: new Date(),
            leida: false,
            icono: "contrato",
            idUsuario: servicio.idUsuario
          });
          await notificacion.save();

          return contrato;
        } else {
          throw new Error("Un usuario no puede contratar su propio servicio");
        }
      } else {
        throw new Error("Ingrese todos los datos requeridos en el formato correcto");
      }
    }
  },
};

const cancelContract = {
  description: "Cancelar contrato",
  type: TypeContrato,
  args: {
    idContrato: { type: GraphQLID },
  },
  async resolve(parent, { idContrato }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      const contratoACancelar = await Contrato.findById(idContrato);
      contratoACancelar.servicio = await Servicio.findById(contratoACancelar.idServicio);

      // Cliente cancela el contrato
      if (contratoACancelar.idUsuario == usuario._id) {
        contratoACancelar.contratoCanceladoPorOferente = false;
        contratoACancelar.fechaCancelacion = new Date();
        contratoACancelar.estado = "Cancelado";
        const contratoCancelado = await contratoACancelar.save();

        const notificacion = new Notificacion({
          descripcion: 'El usuario ' + usuario.nombreUsuario + ' canceló el contrato por el servicio: ' + contratoACancelar.servicio.titulo,
          link: '/servicio/' + contratoACancelar.servicio._id,
          fechaHora: new Date(),
          leida: false,
          icono: "contrato",
          idUsuario: contratoACancelar.servicio.idUsuario
        });
        await notificacion.save();

        return contratoCancelado;

        // Oferente cancela el contrato
      } else if (contratoACancelar.servicio.idUsuario == usuario._id) {
        contratoACancelar.contratoCanceladoPorOferente = true;
        contratoACancelar.fechaCancelacion = new Date();
        contratoACancelar.estado = "Cancelado";
        const contratoCancelado = await contratoACancelar.save();

        const notificacion = new Notificacion({
          descripcion: 'El usuario ' + usuario.nombreUsuario + ' canceló el contrato por el servicio: ' + contratoACancelar.servicio.titulo,
          link: '/servicio/' + contratoACancelar.servicio._id,
          fechaHora: new Date(),
          leida: false,
          icono: "contrato",
          idUsuario: contratoACancelar.idUsuario
        });
        await notificacion.save();

        return contratoCancelado;
      } else {
        throw new Error("El usuario no puede cancelar el contrato");
      }
    }
  },
};

const confirmContract = {
  description: "Confirmar contrato",
  type: TypeContrato,
  args: {
    idContrato: { type: GraphQLID },
  },
  async resolve(parent, { idContrato }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      if (idContrato) {
        const contratoAConfirmar = await Contrato.findById(idContrato);
        contratoAConfirmar.servicio = await Servicio.findById(contratoAConfirmar.idServicio);

        // Oferente confirma el contrato
        if (contratoAConfirmar.servicio.idUsuario == usuario._id && contratoAConfirmar.estado === "Contratado" && contratoAConfirmar.fechaCancelacion == null) {
          contratoAConfirmar.estado = "Confirmado";
          const contratoConfirmado = await contratoAConfirmar.save();

          const notificacion = new Notificacion({
            descripcion: 'El usuario ' + usuario.nombreUsuario +
              ' confirmó con éxito el contrato por el servicio: ' + contratoAConfirmar.servicio.titulo +
              '. ¡Contáctalo!',
            link: '/servicio/' + contratoAConfirmar.servicio._id,
            fechaHora: new Date(),
            leida: false,
            icono: "contrato",
            idUsuario: contratoAConfirmar.idUsuario
          });
          await notificacion.save();

          return contratoConfirmado;
        } else {
          throw new Error("El contrato no puede ser confirmado");
        }
      } else {
        throw new Error("Ingrese todos los datos requeridos en el formato correcto");
      }
    }

  }
};

const finishContract = {
  description: "Finalizar contrato",
  type: TypeContrato,
  args: {
    idContrato: { type: GraphQLID },
  },
  async resolve(parent, { idContrato }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      if (idContrato) {
        const contratoAFinalizar = await Contrato.findById(idContrato);
        contratoAFinalizar.servicio = await Servicio.findById(contratoAFinalizar.idServicio);

        // Oferente finaliza el contrato
        if (contratoAFinalizar.servicio.idUsuario == usuario._id && contratoAFinalizar.estado === "Confirmado") {
          contratoAFinalizar.estado = "Finalizado";
          const contratoFinalizado = await contratoAFinalizar.save();

          const notificacion = new Notificacion({
            descripcion: 'El usuario ' + usuario.nombreUsuario +
              ' finalizó con éxito el contrato por el servicio: ' + contratoAFinalizar.servicio.titulo +
              '. ¡Califica tu experiencia!',
            fechaHora: new Date(),
            leida: false,
            abierta: false,
            icono: "contrato",
            idUsuario: contratoAFinalizar.idUsuario
          });
          await notificacion.save();
          notificacion.link = '/servicio/' + contratoAFinalizar.servicio._id + '/' + notificacion._id;
          await notificacion.save();

          return contratoFinalizado;
        } else {
          throw new Error("El contrato no puede ser finalizado");
        }
      } else {
        throw new Error("Ingrese todos los datos requeridos en el formato correcto");
      }
    }

  }
};

const setScore = {
  description: "Calificar",
  type: TypeContrato,
  args: {
    idContrato: { type: GraphQLID },
    score: { type: GraphQLInt }
  },
  async resolve(parent, { idContrato, score }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      if (idContrato) {
        const contratoACalificar = await Contrato.findById(idContrato);
        contratoACalificar.servicio = await Servicio.findById(contratoACalificar.idServicio);

        // Cliente califica el contrato
        if (contratoACalificar.idUsuario == usuario._id) {
          contratoACalificar.calificacion = score;
          const contratoCalificado = await contratoACalificar.save();

          const notificacion = new Notificacion({
            descripcion: 'El usuario ' + usuario.nombreUsuario + ' calificó el contrato por el servicio: ' + contratoACalificar.servicio.titulo,
            link: '/servicio/' + contratoACalificar.servicio._id,
            fechaHora: new Date(),
            leida: false,
            icono: "contrato",
            idUsuario: contratoACalificar.servicio.idUsuario
          });
          await notificacion.save();

          return contratoCalificado;
        } else {
          throw new Error("El contrato no puede ser calificado");
        }
      } else {
        throw new Error("Ingrese todos los datos requeridos en el formato correcto");
      }
    }

  }
};

const readNotifications = {
  description: "Leer notificaciones",
  type: TypeNotificacion,
  async resolve(parent, args, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      return Notificacion.updateMany({ idUsuario: usuario._id, leida: false }, { $set: { leida: true } });
    }
  },
};

const openNotification = {
  description: "Abrir notificacion",
  type: TypeNotificacion,
  args: {
    idNotificacion: { type: GraphQLID },
  },
  async resolve(parent, { idNotificacion }, { usuario }) {
    if (!usuario) {
      throw new Error("Acceso no autorizado");
    } else {
      return Notificacion.findOneAndUpdate({ _id: idNotificacion, abierta: false, idUsuario: usuario._id }, { $set: { abierta: true } })
    }
  },
};

module.exports = {
  signUp,
  signIn,
  updateUsuario,
  cambiarClave,
  updateProfileImage,
  deleteProfileImage,
  addNivel,
  deleteNivel,
  updateNivel,
  addCategoria,
  deleteCategoria,
  updateCategoria,
  publishService,
  signContract,
  cancelContract,
  confirmContract,
  finishContract,
  setScore,
  readNotifications,
  openNotification,
  deleteAccount
};
