const { GraphQLString, GraphQLList } = require('graphql');
const { TypeCategoria } = require('./types');
const { Categoria } = require('../models/index');

const categorias = {
    description: 'Categorias',
    type: GraphQLList(TypeCategoria),
    async resolve(parent, args, { usuario }) {
        if (!usuario || !usuario.isAdministrador) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Categoria.find();
        }
    }
}

module.exports = { categorias }
