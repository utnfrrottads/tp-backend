const { GraphQLString, GraphQLList } = require('graphql');
const { TypeCategoria } = require('./types');
const { Categoria } = require('../models/index');

const categoria = {
    description: 'Categoria',
    type: TypeCategoria,
    args: {
        _id: { type: GraphQLString }
    },
    async resolve(parent, args, { usuario }) {
        if (!usuario || !usuario.isAdministrador) {
            throw new Error('Acceso no autorizado');
        } else {
            const { _id } = args;
            return await Categoria.findById(_id);
        }
    }
}

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

module.exports = { categoria, categorias }
