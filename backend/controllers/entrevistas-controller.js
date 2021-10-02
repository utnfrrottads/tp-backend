const sequelize = require('../database/db-connection');
const { Op } = require("sequelize");
const initModels = require('../models/init-models');
const models = initModels(sequelize);

createEntrevista = async (body) => {
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
        const entrevista = await models.entrevistas.findOne({ where: { id_entrevista: id_entrevista } })

        if (!entrevista) {
            throw new Error(`Entrevista with ID ${id_entrevista} not found`);
        }

        await models.entrevistas.update(body,
            {
                where: {
                    id_entrevista: id_entrevista
                },
                transaction: transaction
            });

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

getEntrevistas = async (filtros) => {

    const where = {};
    if (filtros.descripcion) where.descripcion = { [Op.like]: '%' + filtros.descripcion + '%' };
    if (filtros.fechaInicio && filtros.fechaFin) {
    
        // The date string should be in ISO format (YYYY-MM-DD or MM/DD/YYYY or YYYY-MM-DDTHH:MM:SSZ).
        const fechaInicio = new Date(filtros.fechaInicio);
        const fechaFin = new Date(filtros.fechaFin);
        if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
            throw new Error("Formato de fecha inválido.");
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
};

module.exports = {
    getEntrevistas,
    getEntrevista,
    createEntrevista,
    updateEntrevista,
    deleteEntrevista
};
