const { GraphQLSchema, GraphQLObjectType } = require('graphql');

// Import queries
const { categorias } = require('./queries');

// Import mutations
const { signUp, signIn, updateUsuario, cambiarClave, addCategoria, deleteCategoria, updateCategoria } = require('./mutations');

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: { categorias }
})

// Define MutationType
const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "Mutations",
    fields: { signUp, signIn, updateUsuario, cambiarClave, addCategoria, deleteCategoria, updateCategoria }
})

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
