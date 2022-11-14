const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require("sequelize");


const getMechanicByRegistrationNumber = async (mechanicRegistrationNumber) => {
    return await models.Mechanic.findOne({
        where: {
            registrationNumber: mechanicRegistrationNumber
        }
    });
};


const getMechanicByPk = async (mechanicId) => {
    return await models.Mechanic.findByPk(mechanicId);
};


const getMechanics = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || 10;
    const offset = parseInt(queryParams.offset) || 0;
    const query = queryParams.query;

    let mechanics = [];

    if (query) {
        mechanics = await models.Mechanic.findAll({
            where: {
                [Op.or]: [
                    {
                        firstName: {
                            [Op.substring]: query
                        },
                    },
                    {
                        lastName: {
                            [Op.substring]: query
                        }
                    }
                ] 
            },
            limit: limit,
            offset: offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });
    } else {
        mechanics = await models.Mechanic.findAll({
            limit: limit,
            offset: offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });
    }

    return mechanics;
};


const createMechanic = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newMechanic = await models.Mechanic.create(data, { transaction });
        await transaction.commit();
        
        return newMechanic;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const deleteMechanic = async (mechanicId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Mechanic.destroy({
            where: {
                mechanicId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const editMechanic = async (data, mechanicId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Mechanic.update(data, {
            where: {
                mechanicId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    getMechanicByRegistrationNumber,
    getMechanicByPk,
    getMechanics,
    createMechanic,
    deleteMechanic,
    editMechanic
};