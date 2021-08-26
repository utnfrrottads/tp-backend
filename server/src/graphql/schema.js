const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const {
    niveles,
    categorias,
    servicios,
    misServicios,
    detalleServicio
} = require('./queries');

// Import mutations
const {
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
    publishService
} = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { niveles, categorias, servicios, misServicios, detalleServicio }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { signUp, signIn, updateUsuario, cambiarClave, updateProfileImage, deleteProfileImage, addNivel, deleteNivel, updateNivel, addCategoria, deleteCategoria, updateCategoria, publishService }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
