const models = require('../models');
const { Op } = require('sequelize');


const getAnyStartedRepairsForVehicle = async (vehicleId) => {
    return await models.Repair.findOne({
        where: {
            vehicleId,
            status: {
                [Op.in]: ['Entered', 'In progress']
            }
        }
    });
};


module.exports = {
    getAnyStartedRepairsForVehicle
};