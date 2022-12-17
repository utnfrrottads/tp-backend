const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const shiftService = require('../services/shiftService');


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


const isRepairRelatedToAShift = async (customerId) => {
    const repairShift = await shiftService.getRepairShiftByCustomerId(customerId);

    return repairShift ? true : false;
};


const changeShiftStatusToEntered = async (customerId) => {
    await shiftService.changeShiftStatusToEntered(customerId);
};


const createRepair = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newRepair = await models.Repair.create({
            status: 'Entered',
            initialDetail: data.initialDetail,
            comments: data.comments,
            vehicleId: data.vehicleId
        }, { transaction });
        await transaction.commit();
        
        return newRepair;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    getAnyStartedRepairsForVehicle,
    isRepairRelatedToAShift,
    changeShiftStatusToEntered,
    createRepair
};