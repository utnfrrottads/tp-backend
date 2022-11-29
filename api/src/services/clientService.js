const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require("sequelize");


const getClientByDni = async (dni) => {
    return await models.Client.findOne({
        where: {
            dni
        }
    });
};


const getClientByPk = async (clientId) => {
    return await models.Client.findByPk(clientId);
};


const getClients = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || 10;
    const offset = parseInt(queryParams.offset) || 0;
    const query = queryParams.query;

    let clients = [];

    if (query) {
        clients = await models.Client.findAll({
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
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });
    } else {
        clients = await models.Client.findAll({
            limit,
            offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });
    }

    return clients;
};


const createClient = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newClient = await models.Client.create(data, { transaction });
        await transaction.commit();
        
        return newClient;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const deleteClient = async (clientId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Client.destroy({
            where: {
                clientId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const editClient = async (data, clientId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Client.update(data, {
            where: {
                clientId
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
    getClientByDni,
    getClientByPk,
    getClients,
    createClient,
    deleteClient,
    editClient
};