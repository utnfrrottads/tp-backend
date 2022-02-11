const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const {
    usuario,
    niveles,
    categorias,
    getCategoriaById,
    monedas,
    servicio,
    servicios,
    misServicios,
    detalleServicio,
    contrato,
    serviciosContratados,
    contratosRealizados,
    contratosRecibidos,
    mensajesDelContrato,
    misNotificaciones,
    estadisticas,
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
    signContract,
    cancelContract,
    readNotifications,
    deleteAccount,
} = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { usuario, niveles, categorias, getCategoriaById, monedas, servicio, servicios, misServicios, detalleServicio, contrato, serviciosContratados, contratosRealizados, contratosRecibidos, mensajesDelContrato, misNotificaciones, estadisticas }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { signUp, signIn, updateUsuario, cambiarClave, updateProfileImage, deleteProfileImage, addNivel, deleteNivel, updateNivel, addCategoria, deleteCategoria, updateCategoria, publishService, signContract, cancelContract, readNotifications, deleteAccount }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
