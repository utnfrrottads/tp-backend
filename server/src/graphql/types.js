const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require('graphql');

const {} = require('../models/index');

const TypeUsuario = new GraphQLObjectType({
    name: "Usuario",
    description: "Type usuario",
    fields: () => ({
        _id: { type: GraphQLID },
        nombreUsuario: { type: GraphQLString },
        nombreApellido: { type: GraphQLString },
        email: { type: GraphQLString },
        habilidades: { type: GraphQLString }
    })
})

module.exports = { TypeUsuario }
