const { GraphQLList } = require('graphql');
const { TypeNivel, TypeCategoria, TypeServicio } = require('./types');
const { Nivel, Categoria, Servicio } = require('../models/index');

const niveles = {
    description: 'Niveles',
    type: GraphQLList(TypeNivel),
    async resolve(parent, args, { usuario }) {
        if (!usuario || !usuario.isAdministrador) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Nivel.find();
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

module.exports = { niveles, categorias, servicios }
