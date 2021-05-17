const { GraphQLObjectType, GraphQLScalarType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } = require('graphql');

const { Usuario, Nivel, Contrato, Servicio, Categoria } = require('../models');

const TypeUsuario = new GraphQLObjectType({
    name: "Usuario",
    description: "Type usuario",
    fields: () => ({
        _id: { type: GraphQLID },
        nombreUsuario: { type: GraphQLString },
        nombreApellido: { type: GraphQLString },
        email: { type: GraphQLString },
        habilidades: { type: GraphQLString },
        nivel: {
            type: TypeNivel,
            resolve(parent, args) {
                return Nivel.findById(parent.idNivel);
            }
        },
        servicios: {
            type: GraphQLList(TypeServicio),
            resolve(parent, args) {
                return Servicio.find({ idUsuario: parent._id });
            }
        },
        contratos: {
            type: GraphQLList(TypeContrato),
            resolve(parent, args) {
                return Contrato.find({ idUsuario: parent._id });
            }
        }
    })
})

const TypeNivel = new GraphQLObjectType({
    name: "Nivel",
    description: "Type nivel",
    fields: () => ({
        _id: { type: GraphQLID },
        contratosMinimos: { type: GraphQLInt },
        usuarios: {
            type: GraphQLList(TypeUsuario),
            resolve(parent, args) {
                return Usuario.find({ idNivel: parent._id });
            }
        }
    })
})

const TypeContrato = new GraphQLObjectType({
    name: "Contrato",
    description: "Type contrato",
    fields: () => ({
        _id: { type: GraphQLID },
        fecha: { type: DateScalar },
        fechaCancelacion: { type: DateScalar },
        servicio: {
            type: TypeServicio,
            resolve(parent, args) {
                return Servicio.findById(parent.idServicio);
            }
        },
        usuario: {
            type: TypeUsuario,
            resolve(parent, args) {
                return Usuario.findById(parent.idUsuario);
            }
        }
    })
})

const TypeServicio = new GraphQLObjectType({
    name: "Servicio",
    description: "Type servicio",
    fields: () => ({
        _id: { type: GraphQLID },
        descripcion: { type: GraphQLString },
        precio: { type: Precio },
        categoria: {
            type: TypeCategoria,
            resolve(parent, args) {
                return Categoria.findById(parent.idCategoria);
            }
        },
        usuario: {
            type: TypeUsuario,
            resolve(parent, args) {
                return Usuario.findById(parent.idUsuario);
            }
        },
        contratos: {
            type: GraphQLList(TypeContrato),
            resolve(parent, args) {
                return Contrato.find({ idServicio: parent._id });
            }
        }
    })
})

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
            }
        }
    })
})

const DateScalar = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
        return new Date(value);
    },
    serialize(value) {
        return value.toISOString();
    }
})

const Precio = new GraphQLObjectType({
    name: 'Precio',
    fields: () => ({
        valor: { type: GraphQLFloat },
        moneda: { type: GraphQLString }
    })
})

module.exports = { TypeUsuario, TypeNivel, TypeContrato, TypeServicio, TypeCategoria }
