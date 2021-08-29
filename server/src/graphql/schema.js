const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const {
    usuario,
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
    publishService,
    signContract
} = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { usuario, niveles, categorias, servicios, misServicios, detalleServicio }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { signUp, signIn, updateUsuario, cambiarClave, updateProfileImage, deleteProfileImage, addNivel, deleteNivel, updateNivel, addCategoria, deleteCategoria, updateCategoria, publishService, signContract }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
