const {
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat,
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
    monedas: {
      type: GraphQLList(TypeMoneda),
    },
  }),
});

const TypeUsuario = new GraphQLObjectType({
  name: "Usuario",
  description: "Type usuario",
  fields: () => ({
    _id: { type: GraphQLID },
    nombreUsuario: { type: GraphQLString },
    nombreApellido: { type: GraphQLString },
    email: { type: GraphQLString },
    habilidades: { type: GraphQLString },
    isAdministrador: { type: GraphQLBoolean },
    idNivel: { type: GraphQLID },
    nivel: {
      type: TypeNivel,
      resolve(parent, args) {
        return Nivel.findById(parent.idNivel);
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
  name: "Nivel",
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
  name: "Contrato",
  description: "Type contrato",
  fields: () => ({
    _id: { type: GraphQLID },
    fecha: { type: TypeDateScalar },
    fechaCancelacion: { type: TypeDateScalar },
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
  }),
});

const TypeServicio = new GraphQLObjectType({
  name: "Servicio",
  description: "Type servicio",
  fields: () => ({
    _id: { type: GraphQLID },
    titulo: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    precio: { type: TypePrecio },
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

const TypeCategoria = new GraphQLObjectType({
  name: "Categoria",
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

const TypeDateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
});

const TypeMoneda = new GraphQLObjectType({
  name: "Moneda",
  description: "Type Moneda",
  fields: () => ({
    _id: { type: GraphQLID },
    tag: { type: GraphQLString },
  }),
});

const TypePrecio = new GraphQLObjectType({
  name: "Precio",
  fields: () => ({
    valor: { type: GraphQLFloat },
    moneda: {
      type: TypeMoneda,
      resolve(parent, args) {
        return Moneda.find({ idMoneda: parent._id });
      },
    },
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
};
