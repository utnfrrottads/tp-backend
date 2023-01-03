const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');


const getMechanicByRegistrationNumber = async (registrationNumber) => {
    return await models.Mechanic.findOne({
        where: {
            registrationNumber
        }
    });
};


const getMechanicById = async (mechanicId) => {
    return await models.Mechanic.findByPk(mechanicId);
};


const getMechanics = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || null;
    const offset = parseInt(queryParams.offset) || null;
    const query = queryParams.query;

    const {count: numberOfMechanics, rows: mechanics} = await models.Mechanic.findAndCountAll({
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
        limit,
        offset,
        order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });

    return {total: numberOfMechanics, records: mechanics};
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
    getMechanicById,
    getMechanics,
    createMechanic,
    deleteMechanic,
    editMechanic
};