const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');


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
    const limit = parseInt(queryParams.limit) || null;
    const offset = parseInt(queryParams.offset) || null;
    const query = queryParams.query;

    const {count: numberOfCustomers, rows: customers} = await models.Customer.findAndCountAll({
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

    return {total: numberOfCustomers, records: customers};
};


const getCustomerVehicles = async (customerId) => {
    return await models.Customer.findOne({
        where: {
            customerId
        },
        include: [
            {
                model: models.Vehicle
            }
        ]
    });
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
    getCustomerVehicles,
    createCustomer,
    deleteCustomer,
    editCustomer
};