const { GraphQLString, GraphQLList } = require('graphql');
const { TypeCategoria, TypeServicio } = require('./types');
const { Categoria, Servicio } = require('../models/index');

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
    async resolve(parent, args) {
          return await Categoria.find();
    }
}

const servicios = {
  description: 'Servicios',
  type: GraphQLList(TypeServicio),
  async resolve(parent, args) {
    return await Servicio.find();
  }
}

module.exports = { categoria, categorias, servicios }
