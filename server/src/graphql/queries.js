const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { TypeUsuario, TypeNivel, TypeCategoria, TypeMoneda, TypeServicio, TypeContrato, TypeMensaje, InputIDCategoriasSeleccionadas } = require('./types');
const { Usuario, Nivel, Categoria, Moneda, Servicio, Contrato, Mensaje } = require('../models/index');

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

const monedas = {
    description: 'Monedas',
    type: GraphQLList(TypeMoneda),
    async resolve(parent, args) {
        return await Moneda.find();
    }
}

const servicio = {
    description: 'Servicio',
    type: TypeServicio,
    args: {
        idServicio: { type: GraphQLID },
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

const contrato = {
    description: 'Contrato',
    type: TypeContrato,
    args: {
        idContrato: { type: GraphQLID },
    },
    async resolve(parent, { idContrato }) {
        return await Contrato.findById(idContrato);
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

const contratosRealizados = {
    description: 'Contratos Realizados',
    type: GraphQLList(TypeContrato),
    args: {
        idServicio: { type: GraphQLID },
    },
    async resolve(parent, { idServicio }, { usuario }) {
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Contrato.find({ idServicio, idUsuario: usuario._id }).sort({ fecha: -1 });
        }
    }
}

const contratosRecibidos = {
    description: 'Contratos Recibidos',
    type: GraphQLList(TypeContrato),
    args: {
        idServicio: { type: GraphQLID },
    },
    async resolve(parent, { idServicio }, { usuario }) {
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            const servicio = await Servicio.findOne({ _id: idServicio, idUsuario: usuario._id });
            if (servicio) {
                return await Contrato.find({ idServicio: servicio._id }).sort({ fecha: -1 });
            } else {
                throw new Error('El servicio no fue publicado por el usuario');
            }
        }
    }
}

const mensajesDelContrato = {
    description: 'Mensajes Del Contrato',
    type: GraphQLList(TypeMensaje),
    args: {
        idContrato: { type: GraphQLID },
    },
    async resolve(parent, { idContrato }, { usuario }) {
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            const contrato = await Contrato.findById(idContrato);
            contrato.servicio = await Servicio.findById(contrato.idServicio);
            if (contrato && (usuario._id == contrato.servicio.idUsuario || usuario._id == contrato.idUsuario)) {
                return await Mensaje.find({ idContrato: contrato._id.toString() });
            } else {
                throw new Error('Acceso no autorizado');
            }
        }
    }
}

module.exports = {
    usuario,
    niveles,
    categorias,
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
}
