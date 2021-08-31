const { GraphQLString, GraphQLList, ObjectId } = require('graphql');
const { TypeUsuario, TypeNivel, TypeCategoria, TypeServicio, TypeContrato, InputIDCategoriasSeleccionadas } = require('./types');
const { Usuario, Nivel, Categoria, Servicio, Contrato } = require('../models/index');

const usuario = {
    description: 'Usuario',
    type: TypeUsuario,
    args: {
        nombreUsuario: { type: GraphQLString },
    },
    async resolve(parent, { nombreUsuario }) {
        return await Usuario.findOne({ nombreUsuario });
    }
}

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

const servicio = {
    description: 'Servicio',
    type: TypeServicio,
    args: {
        idServicio: { type: GraphQLString },
    },
    async resolve(parent, { idServicio }) {
        return await Servicio.findById(idServicio);
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
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Servicio.find({ titulo: { $regex: ".*" + busqueda, $options: "i" }, idCategoria: { $in: categorias.categoriasIDs }, idUsuario: usuario._id }).sort({ fechaHoraPublicacion: -1 });
        }
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

const serviciosContratados = {
    description: 'Servicios Contratados',
    type: GraphQLList(TypeContrato),
    async resolve(parent, args, { usuario }) {
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Contrato.find({ idUsuario: usuario._id }).sort({ fecha: -1 });
        }
    }
}

module.exports = {
    usuario,
    niveles,
    categorias,
    servicio,
    servicios,
    misServicios,
    detalleServicio,
    serviciosContratados
}
