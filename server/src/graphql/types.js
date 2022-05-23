const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
} = require("graphql");

const {
  Usuario,
  Nivel,
  Contrato,
  Servicio,
  Categoria,
  Moneda,
} = require("../models");

const LoginOutput = new GraphQLObjectType({
  name: "LoginOutput",
  fields: () => ({
    usuario: { type: TypeUsuario },
    token: { type: GraphQLString },
  }),
});

const TypeUsuario = new GraphQLObjectType({
  name: "TypeUsuario",
  description: "Type usuario",
  fields: () => ({
    _id: { type: GraphQLID },
    nombreUsuario: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString },
    fotoPerfil: { type: GraphQLString },
    isAdministrador: { type: GraphQLBoolean },
    nivel: {
      type: TypeNivel,
      async resolve(parent, args) {
        return Nivel.findOne({ contratosMinimos: { $gte: await Contrato.find({ idUsuario: parent._id }).count() } }).sort({ nro: 1 });
      },
    },
    servicios: {
      type: GraphQLList(TypeServicio),
      resolve(parent, args) {
        return Servicio.find({ idUsuario: parent._id });
      },
    },
    contratos: {
      type: GraphQLList(TypeContrato),
      resolve(parent, args) {
        return Contrato.find({ idUsuario: parent._id });
      },
    },
  }),
});

const TypeNivel = new GraphQLObjectType({
  name: "TypeNivel",
  description: "Type nivel",
  fields: () => ({
    _id: { type: GraphQLID },
    nro: { type: GraphQLInt },
    contratosMinimos: { type: GraphQLInt },
    usuarios: {
      type: GraphQLList(TypeUsuario),
      resolve(parent, args) {
        return Usuario.find({ idNivel: parent._id });
      },
    },
  }),
});

const TypeContrato = new GraphQLObjectType({
  name: "TypeContrato",
  description: "Type contrato",
  fields: () => ({
    _id: { type: GraphQLID },
    fecha: { type: TypeDateTimeScalar },
    contratoCanceladoPorOferente: { type: GraphQLBoolean },
    fechaCancelacion: { type: TypeDateTimeScalar },
    servicio: {
      type: TypeServicio,
      resolve(parent, args) {
        return Servicio.findById(parent.idServicio);
      },
    },
    usuario: {
      type: TypeUsuario,
      resolve(parent, args) {
        return Usuario.findById(parent.idUsuario);
      },
    },
    estado: { type: GraphQLString },
    calificacion: { type: GraphQLInt },
  }),
});

const TypeMensaje = new GraphQLObjectType({
  name: "TypeMensaje",
  description: "Type mensaje",
  fields: () => ({
    _id: { type: GraphQLID },
    mensaje: { type: GraphQLString },
    mensajeEnviadoPorOferente: { type: GraphQLBoolean },
    fechaHoraEnvio: { type: TypeDateTimeScalar },
    contrato: {
      type: TypeContrato,
      resolve(parent, args) {
        return Contrato.findById(parent.idContrato);
      },
    },
  }),
});

const TypeServicio = new GraphQLObjectType({
  name: "TypeServicio",
  description: "Type servicio",
  fields: () => ({
    _id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    precio: { type: TypePrecio },
    ubicacion: { type: GraphQLString },
    fechaHoraPublicacion: { type: TypeDateTimeScalar },
    categoria: {
      type: TypeCategoria,
      resolve(parent, args) {
        return Categoria.findById(parent.idCategoria);
      },
    },
    usuario: {
      type: TypeUsuario,
      resolve(parent, args) {
        return Usuario.findById(parent.idUsuario);
      },
    },
    contratos: {
      type: GraphQLList(TypeContrato),
      resolve(parent, args) {
        return Contrato.find({ idServicio: parent._id });
      },
    },
  }),
});

const TypePrecio = new GraphQLObjectType({
  name: "TypePrecio",
  fields: () => ({
    valor: { type: GraphQLFloat },
    moneda: {
      type: TypeMoneda,
      resolve(parent, args) {
        return Moneda.findById(parent.idMoneda);
      },
    },
  }),
});

const TypeMoneda = new GraphQLObjectType({
  name: "TypeMoneda",
  description: "Type Moneda",
  fields: () => ({
    _id: { type: GraphQLID },
    tag: { type: GraphQLString },
  }),
});

const TypeCategoria = new GraphQLObjectType({
  name: "TypeCategoria",
  description: "Type categoria",
  fields: () => ({
    _id: { type: GraphQLID },
    descripcion: { type: GraphQLString },
    servicios: {
      type: GraphQLList(TypeServicio),
      resolve(parent, args) {
        return Servicio.find({ idCategoria: parent._id });
      },
    },
  }),
});

const TypeNotificacion = new GraphQLObjectType({
  name: "TypeNotificacion",
  description: "Type notificacion",
  fields: () => ({
    _id: { type: GraphQLID },
    descripcion: { type: GraphQLString },
    link: { type: GraphQLString },
    fechaHora: { type: TypeDateTimeScalar },
    leida: { type: GraphQLBoolean },
    abierta: { type: GraphQLBoolean },
    icono: { type: GraphQLString },
    usuario: {
      type: TypeUsuario,
      resolve(parent, args) {
        return Usuario.findById(parent.idUsuario);
      },
    },
  }),
});

const TypeDateTimeScalar = new GraphQLScalarType({
  name: "TypeDateTimeScalar",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const InputIDCategoriasSeleccionadas = new GraphQLInputObjectType({
  name: "InputIDCategoriasSeleccionadas",
  fields: () => ({
    categoriasIDs: { type: GraphQLList(GraphQLID) }
  })
});

const TypeEstadistica = new GraphQLObjectType({
  name: "TypeEstadistica",
  description: "Type estadistica",
  fields: () => ({
    contratosRealizados: { type: GraphQLInt },
    contratistasRegistrados: { type: GraphQLInt },
    prestadoresRegistrados: { type: GraphQLInt },
  }),
});

const TypeEstadisticaServicio = new GraphQLObjectType({
  name: "TypeEstadisticaServicio",
  description: "Type estadistica servicio",
  fields: () => ({
    contratosFinalizados: { type: GraphQLInt },
    calificacionPromedio: { type: GraphQLFloat },
  }),
});

module.exports = {
  TypeUsuario,
  TypeNivel,
  TypeContrato,
  TypeServicio,
  TypeCategoria,
  LoginOutput,
  TypePrecio,
  TypeMoneda,
  TypeMensaje,
  TypeNotificacion,
  InputIDCategoriasSeleccionadas,
  TypeEstadistica,
  TypeEstadisticaServicio,
};
