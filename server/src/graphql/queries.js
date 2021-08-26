const { GraphQLString, GraphQLList } = require('graphql');
const { TypeNivel, TypeCategoria, TypeServicio, InputIDCategoriasSeleccionadas } = require('./types');
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
    args: {
        busqueda: { type: GraphQLString },
        categorias: { type: InputIDCategoriasSeleccionadas },
    },
    async resolve(parent, { busqueda, categorias }) {
        return await Servicio.find({ titulo: { $regex: ".*" + busqueda, $options: "i" }, idCategoria: { $in: categorias.categoriasIDs } }).sort({ fechaHoraPublicacion: -1 });
    }
}

const misServicios = {
    description: 'Mis Servicios',
    type: GraphQLList(TypeServicio),
    args: {
        busqueda: { type: GraphQLString },
        categorias: { type: InputIDCategoriasSeleccionadas },
    },
    async resolve(parent, { busqueda, categorias }, { usuario }) {
        return await Servicio.find({ titulo: { $regex: ".*" + busqueda, $options: "i" }, idCategoria: { $in: categorias.categoriasIDs }, idUsuario: usuario._id }).sort({ fechaHoraPublicacion: -1 });
    }
}

const detalleServicio = {
    description: 'Detalle Del Servicio',
    type: TypeServicio,
    args: {
        _id: { type: GraphQLString },
    },
    async resolve(parent, { _id }) {
        return await Servicio.findById(_id);
    }
}

module.exports = {
    niveles,
    categorias,
    servicios,
    misServicios,
    detalleServicio
}
