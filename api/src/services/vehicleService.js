const sequelize = require('../database/db-connection');
const models = require('../models');
const repairService = require('./repairService');
const { Op } = require('sequelize');


const getVehicleByLicensePlate = async (licensePlate) => {
    return await models.Vehicle.findOne({
        where: {
            licensePlate
        }
    });
};


const getVehicleById = async (vehicleId) => {
    return await models.Vehicle.findByPk(vehicleId);
};


const getVehicles = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || null;
    const offset = parseInt(queryParams.offset) || null;
    const query = queryParams.query;

    const {count: numberOfVehicles, rows: vehicles} = await models.Vehicle.findAndCountAll({
        where: {
            [Op.or]: [
                {
                    licensePlate: {
                        [Op.substring]: query
                    },
                },
                {
                    make: {
                        [Op.substring]: query
                    }
                },
                {
                    model: {
                        [Op.substring]: query
                    },
                }
            ] 
        },
        limit,
        offset,
        order: [['make', 'ASC'], ['model', 'ASC']]
    });

    return {total: numberOfVehicles, records: vehicles};
};


const getVehiclesFromCustomer = async (customerId) => {
    const {count: numberOfVehicles, rows: vehicles} = await models.Vehicle.findAndCountAll({
        where: {
            customerId 
        },
        order: [['make', 'ASC'], ['model', 'ASC']]
    });

    return {total: numberOfVehicles, records: vehicles};
};


const isVehicleSuitableForDeletion = async (vehicleId) => {
    const enteredOrInProgressRepair = await repairService.getAnyStartedRepairsForVehicle(vehicleId);

    return enteredOrInProgressRepair ? false : true;
};


const createVehicle = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newVehicle = await models.Vehicle.create(data, { transaction });
        await transaction.commit();
        
        return newVehicle;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const deleteVehicle = async (vehicleId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Vehicle.destroy({
            where: {
                vehicleId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const editVehicle = async (data, vehicleId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Vehicle.update(data, {
            where: {
                vehicleId
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
    getVehicleByLicensePlate,
    getVehicleById,
    getVehicles,
    getVehiclesFromCustomer,
    isVehicleSuitableForDeletion,
    createVehicle,
    deleteVehicle,
    editVehicle
};