const sequelize = require('../database/db-connection');
const models = require('../models');


const getVehicleByLicensePlate = async (licensePlate) => {
    return await models.Vehicle.findOne({
        where: {
            licensePlate
        }
    });
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


module.exports = {
    getVehicleByLicensePlate,
    createVehicle
};