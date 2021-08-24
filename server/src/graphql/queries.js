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
    async resolve(parent, args) {
        return await Servicio.find();
    }
}

const serviciosPorBusqueda = {
    description: 'Servicios Por Búsqueda',
    type: GraphQLList(TypeServicio),
    args: {
        busqueda: { type: GraphQLString },
    },
    async resolve(parent, { busqueda }) {
        return await Servicio.find({ titulo: { $regex: ".*" + busqueda, $options: "i" } });
    }
}

const serviciosPorCategorias = {
    description: 'Servicios Por Categorias',
    type: GraphQLList(TypeServicio),
    args: {
        categorias: { type: InputIDCategoriasSeleccionadas },
    },
    async resolve(parent, { categorias }) {
        console.log(categorias);
        return await Servicio.find({ idCategoria: { $in: categorias.categoriasIDs } });
    }
}

const misServicios = {
    description: 'Mis Servicios',
    type: GraphQLList(TypeServicio),
    async resolve(parent, args, { usuario }) {
        return await Servicio.find({ idUsuario: usuario._id });
    }
}

const misServiciosPorBusqueda = {
    description: 'Mis Servicios Por Búsqueda',
    type: GraphQLList(TypeServicio),
    args: {
        busqueda: { type: GraphQLString },
    },
    async resolve(parent, { busqueda }, { usuario }) {
        return await Servicio.find({ titulo: { $regex: ".*" + busqueda, $options: "i" }, idUsuario: usuario._id });
    }
}

const misServiciosPorCategorias = {
    description: 'Mis Servicios Por Categorias',
    type: GraphQLList(TypeServicio),
    args: {
        categorias: { type: InputIDCategoriasSeleccionadas },
    },
    async resolve(parent, { categorias }, { usuario }) {
        console.log(categorias);
        return await Servicio.find({ idCategoria: { $in: categorias.categoriasIDs }, idUsuario: usuario._id });
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
    serviciosPorBusqueda,
    serviciosPorCategorias,
    misServicios,
    misServiciosPorBusqueda,
    misServiciosPorCategorias,
    detalleServicio
}
