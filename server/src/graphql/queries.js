const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { TypeUsuario, TypeNivel, TypeCategoria, TypeMoneda, TypeServicio, TypeContrato, TypeMensaje, TypeNotificacion, InputIDCategoriasSeleccionadas, TypeEstadistica } = require('./types');
const { Usuario, Nivel, Categoria, Moneda, Servicio, Contrato, Mensaje, Notificacion } = require('../models/index');
const client = require('../elasticsearch/elasticsearch');

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

const getCategoriaById = {
    description: 'getCategoriaById',
    type: TypeCategoria,
    args: {
        idCategoria: { type: GraphQLID },
    },
    async resolve(parent, { idCategoria }) {
        return await Categoria.findById(idCategoria);
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
        let result = null;

        if (busqueda) {
            result = await client.search({
                index: 'servicios',
                body: {
                    query: {
                        bool: {
                            must: {
                                multi_match: {
                                    query: busqueda,
                                    fields: ['titulo^2', 'descripcion'],
                                    fuzziness: 'AUTO',
                                }
                            },
                            filter: { terms: { idCategoria: categorias.categoriasIDs } }
                        }
                    },
                    min_score: 0.5,
                }
            });
        } else {
            result = await client.search({
                index: 'servicios',
                body: {
                    query: {
                        bool: {
                            filter: { terms: { idCategoria: categorias.categoriasIDs } }
                        }
                    },
                    sort: [
                        { fechaHoraPublicacion: 'desc' }
                    ]
                }
            });
        }

        const servicios = [];
        result.hits.hits.forEach(element => {
            let servicio = element._source;
            servicio._id = element._id;

            servicios.push(servicio);
        });

        return servicios;
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
            let result = null;

            if (busqueda) {
                result = await client.search({
                    index: 'servicios',
                    body: {
                        query: {
                            bool: {
                                must: {
                                    multi_match: {
                                        query: busqueda,
                                        fields: ['titulo^2', 'descripcion'],
                                        fuzziness: 'AUTO',
                                    }
                                },
                                filter: [
                                    { terms: { idCategoria: categorias.categoriasIDs } },
                                    { term: { idUsuario: usuario._id, } }
                                ]
                            }
                        },
                        min_score: 0.5,
                    }
                });
            } else {
                result = await client.search({
                    index: 'servicios',
                    body: {
                        query: {
                            bool: {
                                filter: [
                                    { terms: { idCategoria: categorias.categoriasIDs } },
                                    { term: { idUsuario: usuario._id, } }
                                ]
                            }
                        },
                        sort: [
                            { fechaHoraPublicacion: 'desc' }
                        ]
                    }
                });
            }

            const servicios = [];
            result.hits.hits.forEach(element => {
                let servicio = element._source;
                servicio._id = element._id;

                servicios.push(servicio);
            });

            return servicios;
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

const notificacion = {
    description: 'Notificacion',
    type: TypeNotificacion,
    args: {
        idNotificacion: { type: GraphQLID },
    },
    async resolve(parent, { idNotificacion }) {
        return await Notificacion.findById(idNotificacion);
    }
}

const misNotificaciones = {
    description: 'Mis Notificaciones',
    type: GraphQLList(TypeNotificacion),
    async resolve(parent, args, { usuario }) {
        if (!usuario) {
            throw new Error('Acceso no autorizado');
        } else {
            return await Notificacion.find({ idUsuario: usuario._id }).sort({ fechaHora: -1 });
        }
    }
}

const estadisticas = {
    description: 'Estadísticas',
    type: TypeEstadistica,
    async resolve(parent, args) {
        return {
            contratosRealizados: await Contrato.find().count(),
            contratistasRegistrados: (await Contrato.distinct('idUsuario')).length,
            prestadoresRegistrados: (await Servicio.distinct('idUsuario')).length,
        };
    }
}

module.exports = {
    usuario,
    niveles,
    categorias,
    getCategoriaById,
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
    notificacion,
    misNotificaciones,
    estadisticas,
}
