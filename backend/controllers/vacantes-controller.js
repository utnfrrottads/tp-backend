const sequelize = require('../database/db-connection');
const { Op } = require("sequelize");
const initModels = require('../models/init-models');
const { NotFoundError, InvalidAttributeError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

const vacantStatus = ['pendiente de evaluador', 'evaluador asignado', 'cerrada'];


createVacant = async (body) => {
    checkMissingAttributes(
        { data: body, attrs: ['cargo', 'id_empresa'] },
        { list: body.requerimientos, attrs: ['descripcion'], prefix: 'requerimientos[]' },
    );

    const transaction = await sequelize.transaction();
    try {
        const newVacant = await models.vacantes.create(body, { transaction: transaction });

        if ( body.requerimientos.length > 0 ) {
            await setRequirementsToVacant(body, newVacant.id_vacante, transaction);
        };

        await transaction.commit();
        return newVacant;
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

updateVacant = async (id_vacante, body) => {
    checkMissingAttributes(
        { data: body, attrs: ['cargo', 'estado', 'id_empresa'] },
        { list: body.requerimientos, attrs: ['descripcion'], prefix: 'requerimientos[]' },
    );

    if ( !vacantStatus.includes( body.estado ) ) {
        throw new InvalidAttributeError(`'${body.estado}' no es un estado de vacante correcto. Elegir uno entre 'pendiente de evaluador' o 'evaluador asignado' o 'cerrada'`, 'estado');
    };

    const transaction = await sequelize.transaction();
    try {
        const vacantToUpdate = await models.vacantes.findByPk(id_vacante);

        if (!vacantToUpdate) {
            throw new NotFoundError(id_vacante, 'vacante');
        }

        await models.vacantes.update(body, {
            where: { id_vacante: id_vacante }, 
            transaction: transaction
        });

        await models.requerimientos.destroy({
            where: { id_vacante: id_vacante },
            transaction: transaction,
        });

        if ( body.requerimientos.length > 0 ) {
            await setRequirementsToVacant(body, id_vacante, transaction);
        };
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

deleteVacant = async (id_vacante) => {
    const transaction = await sequelize.transaction();
    try {
        const result = await models.vacantes.destroy({
            where: { id_vacante: id_vacante },
            transaction: transaction
        });

        if (result <= 0) {
            throw new NotFoundError(id_vacante, 'vacante');
        }

        await transaction.commit();
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

getOneVacant = async (id_vacante) => {
    const vacant = await models.vacantes.findOne({
        include: [
            models.empresas,
            models.requerimientos
        ],
        where: {
            id_vacante: id_vacante
        }
    });

    if (!vacant) {
        throw new NotFoundError(id_vacante, 'vacante');
    }

    return vacant;
};

getAllVacants = async (filtros) => {
    const where = {};
    if ( filtros.companyName ) where.razon_social = { [Op.like]: `%${ filtros.companyName }%` };
    return await models.vacantes.findAll({
        include: [
            { 
                model: models.empresas,
                where: where
            },
            models.requerimientos
        ]
    });
};


const setRequirementsToVacant = async (body, id_vacante, transaction) => {
    // El .map devuelve un nuevo array con los resultados de cada iteración, el cual se usa para el bulkCreate
    await models.requerimientos.bulkCreate(body.requerimientos.map(requirement => {
        return {
            id_vacante: id_vacante,
            descripcion: requirement.descripcion
        }
    }), { transaction: transaction });
};


module.exports = {
    createVacant,
    updateVacant,
    deleteVacant,
    getOneVacant,
    getAllVacants
};