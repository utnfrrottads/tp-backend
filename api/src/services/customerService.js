const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require("sequelize");


const getCustomerByDni = async (dni) => {
    return await models.Customer.findOne({
        where: {
            dni
        }
    });
};


const getCustomerById = async (customerId) => {
    return await models.Customer.findByPk(customerId);
};


const getCustomers = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || 10;
    const offset = parseInt(queryParams.offset) || 0;
    const query = queryParams.query;

    let customers = [];

    if (query) {
        customers = await models.Customer.findAll({
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
        customers = await models.Customer.findAll({
            limit,
            offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });
    }

    return customers;
};


const createCustomer = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newCustomer = await models.Customer.create(data, { transaction });
        await transaction.commit();
        
        return newCustomer;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const deleteCustomer = async (customerId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Customer.destroy({
            where: {
                customerId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const editCustomer = async (data, customerId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Customer.update(data, {
            where: {
                customerId
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
    getCustomerByDni,
    getCustomerById,
    getCustomers,
    createCustomer,
    deleteCustomer,
    editCustomer
};