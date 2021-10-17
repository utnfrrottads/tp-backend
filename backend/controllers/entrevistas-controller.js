const asyncForEach = require("../utils/async-for-each");
const sequelize = require('../database/db-connection');
const { Op } = require("sequelize");
const initModels = require('../models/init-models');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const { NotFoundError, InvalidQueryError } = require('../utils/api-error');
const models = initModels(sequelize);

createEntrevista = async (body) => {
    checkMissingAttributes(
        { 
            data: body, 
            attrs: [
                'descripcion',
                'fecha_hora', 
                'estado', 
                'personas_id_candidato',
                'personas_id_evaluador',
                'vacantes_id_vacante',
            ]
        },
    );

    const transaction = await sequelize.transaction();
    try {
        const entrevista = await models.entrevistas.create(body, { transaction: transaction });

        await addEvaluation( body.ids_evaluaciones, entrevista.id_entrevista, transaction );

        await models.vacantes.update({
            estado: 'evaluador asignado',
        }, {
            where: { id_vacante: body.vacantes_id_vacante },
            transaction: transaction,
        });

        await transaction.commit();
        return entrevista;
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

updateEntrevista = async (id_entrevista, body) => {
    checkMissingAttributes(
        { 
            data: body, 
            attrs: [
                'descripcion',
                'fecha_hora', 
                'estado', 
                'personas_id_candidato',
                'personas_id_evaluador',
                'vacantes_id_vacante',
            ]
        },
    );
    const transaction = await sequelize.transaction();
    try {
        if (body.personas_id_candidato) {
            const existe_persona_candidato = await models.personas.findByPk(body.personas_id_candidato);
            if (!existe_persona_candidato) {
                throw new NotFoundError(body.personas_id_candidato, 'persona_candidato');
            }
        }
        
        if (body.personas_id_evaluador) {
            const existe_persona_evaluador = await models.personas.findByPk(body.personas_id_evaluador);
            if (!existe_persona_evaluador) {
                throw new NotFoundError(body.personas_id_evaluador, 'persona_evaluador');
            }
        }

        if (body.vacantes_id_vacante) {
            const existe_vacante = await models.vacantes.findByPk(body.vacantes_id_vacante);
            if (!existe_vacante) {
                throw new NotFoundError(body.vacantes_id_vacante, 'vacante');
            }
        }

        if (id_entrevista) {
            const existe_entrevista = await models.entrevistas.findByPk(id_entrevista);
            if (!existe_entrevista) {
                throw new NotFoundError(id_entrevista, 'entrevista');
            }
        }

        const entrevista = await models.entrevistas.update(body, {
            where: { id_entrevista: id_entrevista },
            transaction: transaction
        });

        await updateResults( body.resultados, id_entrevista, transaction );

        await transaction.commit();
        return entrevista;

    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

deleteEntrevista = async (id_entrevista) => {
    const transaction = await sequelize.transaction();
    try {
        const entrevista = await models.entrevistas.findByPk(id_entrevista);

        if (entrevista <= 0) {
            throw new NotFoundError(id_entrevista, 'entrevista');
        }

        await models.vacantes.update({
            estado: 'pendiente de evaluador',
        }, {
            where: { id_vacante: entrevista.vacantes_id_vacante },
            transaction: transaction,
        });

        await models.entrevistas.destroy({
            where: { id_entrevista: id_entrevista },
            transaction: transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

getEntrevistas = async (filtros) => {
    const where = {};
    if (filtros.descripcion) where.descripcion = { [Op.like]: '%' + filtros.descripcion + '%' };
    if (filtros.fechaInicio && filtros.fechaFin) {
        const fechaInicio = new Date(filtros.fechaInicio);
        const fechaFin = new Date(filtros.fechaFin);
        if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
            throw new InvalidQueryError('Formato de fecha inválido. Asegurese que coincida con el formato YYYY-MM-DD.', ['fechaInicio', 'fechaFin']);
        }
        where.fecha_hora = { [Op.between]: [fechaInicio, fechaFin] };
    }

    const entrevistas = await models.entrevistas.findAll({
        include: [
            {
                model: models.personas, as: 'persona_candidato',
                include: {
                    model: models.direcciones,
                    include: {
                        model: models.ciudades,
                        include: {
                            model: models.provincias,
                            include: {
                                model: models.paises
                            }
                        }
                    }
                }
            },
            {
                model: models.personas, as: 'persona_evaluador',
                include: {
                    model: models.direcciones,
                    include: {
                        model: models.ciudades,
                        include: {
                            model: models.provincias,
                            include: {
                                model: models.paises
                            }
                        }
                    }
                }
            },
            {
                model: models.vacantes,
                include: {
                    model: models.empresas
                }
            },
            {
                model: models.evaluaciones,
            }
        ],
        where: where
    });

    return entrevistas;
};

getEntrevista = async (id_entrevista) => {
    const entrevista = await models.entrevistas.findOne({
        where: { id_entrevista: id_entrevista },
        include: [
            {
                model: models.personas, as: 'persona_candidato',
                include: {
                    model: models.direcciones,
                    include: {
                        model: models.ciudades,
                        include: {
                            model: models.provincias,
                            include: {
                                model: models.paises
                            }
                        }
                    }
                }
            },
            {
                model: models.personas, as: 'persona_evaluador',
                include: {
                    model: models.direcciones,
                    include: {
                        model: models.ciudades,
                        include: {
                            model: models.provincias,
                            include: {
                                model: models.paises
                            }
                        }
                    }
                }
            },
            {
                model: models.vacantes,
                include: {
                    model: models.empresas
                }
            },
            {
                model: models.evaluaciones,
            }
        ]
    });

    if (!entrevista) {
        throw new NotFoundError(id_entrevista, 'entrevista');
    }

    return entrevista;
};

const addEvaluation = async (ids_evaluaciones, id_entrevista, transaction) => {
    await asyncForEach( ids_evaluaciones, async (id_evaluacion) => {
            await models.resultados.create({
                entrevistas_id_entrevista: id_entrevista,
                evaluaciones_id_evaluacion: id_evaluacion
            }, { transaction: transaction });
    });
};

const updateResults = async (resultados, id_entrevista, transaction) => {
    await asyncForEach(resultados, async (resultado) => {
        await models.resultados.upsert({
            entrevistas_id_entrevista: id_entrevista,
            evaluaciones_id_evaluacion: resultado.evaluaciones_id_evaluacion,
            resultado_evaluacion: resultado.resultado_evaluacion,
            comentario: resultado.comentario
        }, { where: {
                [Op.and]: [
                    { entrevistas_id_entrevista: id_entrevista },
                    { evaluaciones_id_evaluacion: resultado.evaluaciones_id_evaluacion }
                ]
            }, transaction: transaction
        });
    });
};

module.exports = {
    getEntrevistas,
    getEntrevista,
    createEntrevista,
    updateEntrevista,
    deleteEntrevista
};
