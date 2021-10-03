const sequelize = require('../database/db-connection');
const { Op } = require("sequelize");
const initModels = require('../models/init-models');
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
                'evaluadores_a_cargo_personas_id_evaluador', 
                'evaluadores_a_cargo_especialidades_id_especialidad', 
                'personas_id_candidato',
                'vacantes_id_vacante'
            ]
        },
    );

    const transaction = await sequelize.transaction();
    try {
        const entrevista = await models.entrevistas.create(body, { transaction: transaction });
        await transaction.commit();
        return entrevista;
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

updateEntrevista = async (id_entrevista, body) => {
    const transaction = await sequelize.transaction();
    try {
        if (body.personas_id_candidato) {
            const persona = await models.personas.findByPk(body.personas_id_candidato);
            if (!persona) {
                throw new NotFoundError(body.personas_id_candidato, 'persona');
            }
        }
        
        if (body.vacantes_id_vacante) {
            const vacante = await models.vacantes.findByPk(body.vacantes_id_vacante);
            if (!vacante) {
                throw new NotFoundError(body.vacantes_id_vacante, 'vacante');
            }
        }

        // TODO: Corregir clave primaria de evaluadores_a_cargo.
        // if (body.evaluadores_a_cargo_personas_id_evaluador,body.evaluadores_a_cargo_especialidades_id_especialidad){
        //     const evaluadores_a_cargo = await models.vacantes.findByPk(body.evaluadores_a_cargo_personas_id_evaluador,body.evaluadores_a_cargo_especialidades_id_especialidad);
        //     if (!evaluadores_a_cargo) {
        //         throw new NotFoundError(body.vacantes_id_vacante, 'evaluadores a cargo');
        //     }
        // }

        const entrevista = await models.entrevistas.update(body, {
            where: { id_entrevista: id_entrevista },
            transaction: transaction
        });

        if (!entrevista) {
            throw new NotFoundError(id_entrevista, 'entrevista');
        }

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
        const entrevistaDeleted = await models.vacantes.destroy({
            where: { id_entrevista: id_entrevista },
            transaction: transaction
        });

        if (entrevistaDeleted === 0) {
            throw new NotFoundError(id_entrevista, 'entrevista');
        }

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
                model: models.evaluadores_a_cargo,
                
            },
            {
                model: models.personas,
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
                model: models.evaluadores_a_cargo,
                include: {
                    model: models.especialidades
                }
            },
            {
                model: models.personas,
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
        ]
    });

    if (!entrevista) {
        throw new NotFoundError(id_entrevista, 'entrevista');
    }

    return entrevista;
};

module.exports = {
    getEntrevistas,
    getEntrevista,
    createEntrevista,
    updateEntrevista,
    deleteEntrevista
};
