const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const {
    niveles,
    categorias,
    servicios,
    serviciosPorBusqueda,
    serviciosPorCategorias
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
    fields: { niveles, categorias, servicios, serviciosPorBusqueda, serviciosPorCategorias }
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
