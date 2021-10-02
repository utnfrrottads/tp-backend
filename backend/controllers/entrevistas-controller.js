const validator = require('validator');
//const asyncForEach = require('../sharedFunctions/asyncForEach');

const sequelize = require('../database/db-connection');
const evaluadores_a_cargo = require('../models/evaluadores_a_cargo');
const initModels = require('../models/init-models');
const personas = require('../models/personas');
const vacantes = require('../models/vacantes');
const models = initModels(sequelize);


// Dar de alta una entrevista
createEntrevista = async (body) => {
    const transaction = await sequelize.transaction();
    try {
        const newEntrevista = await models.entrevistas.create({
            descripcion: body.descripcion,
            fecha_hora: body.fecha_hora,
            estado: body.estado,
            comentario: body.comentario,
            evaluadores_a_cargo_personas_id_evaluador: body.evaluadores_a_cargo_personas_id_evaluador,
            evaluadores_a_cargo_especialidades_id_especialidad: body.evaluadores_a_cargo_especialidades_id_especialidad,
            personas_id_candidato: body.personas_id_candidato,
            vacantes_id_vacante: body.vacantes_id_vacante,
        }, { transaction: transaction });

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

// Modificación de una entrevista
updateEntrevista = async (id_entrevista, body) => {
    const transaction = await sequelize.transaction();
    try {

        const entrevista = await models.entrevistas.findOne({ where: { id_entrevista: id_entrevista } })

        if (!entrevista) {
            throw new Error(`Entrevista with ID ${id_entrevista} not found`);
        }

        await models.entrevistas.update({
            descripcion: body.descripcion,
            fecha_hora: body.fecha_hora,
            estado: body.estado,
            comentario: body.comentario,
            evaluadores_a_cargo_personas_id_evaluador: body.evaluadores_a_cargo_personas_id_evaluador,
            evaluadores_a_cargo_especialidades_id_especialidad: body.evaluadores_a_cargo_especialidades_id_especialidad,
            personas_id_candidato: body.personas_id_candidato,
            vacantes_id_vacante: body.vacantes_id_vacante,
        },
            {
                where: {
                    id_entrevista: id_entrevista
                },
                transaction: transaction
            });

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

deleteEntrevista = async (id_entrevista) => {
    const transaction = await sequelize.transaction();
    try {
        if (!id_entrevista) {
            throw new Error('Param is missing');
        }

        const entrevistaDeleted = await models.vacantes.destroy({
            where: {
                id_entrevista: id_entrevista
            }, transaction: transaction
        });

        if (entrevistaDeleted === 0) { // Si la cláusula where falla y no se puede eliminar la vacante
            throw new Error(`There is no a entrevista with ID ${id_entrevista}`);
        }

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};


// Consultar todas las entrevistas

getEntrevistas = async () => {
    try {
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

            ]
        });

        if (entrevistas.length === 0) {
            throw new Error('Entrevistas not found');
        }

        return entrevistas;
    }
    catch (error) {
        throw error;
    }
};

//Consultar entrevista por su ID
getEntrevista = async (id_entrevista) => {
    try {
        if (!id_entrevista) {
            throw new Error('Param is missing');
        }

        const entrevista = await models.entrevistas.findOne(
            {
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
            }
        );

        if (!entrevista) {
            throw new Error(`There is no entrevista with ID ${id_entrevista}`);
        }

        return entrevista;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    getEntrevistas,
    getEntrevista,
    createEntrevista,
    updateEntrevista,
    deleteEntrevista
};