const sequelize = require('../database/db-connection');
const models = require('../models');
const repairService = require('./repairService');


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


module.exports = {
    getVehicleByLicensePlate,
    getVehicleById,
    isVehicleSuitableForDeletion,
    createVehicle,
    deleteVehicle
};