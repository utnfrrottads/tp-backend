const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const shiftService = require('../services/shiftService');
const { IN_PROGRESS_REPAIR, ENTERED_REPAIR } = require('../utils/repairStatus');


const getRepairById = async (repairId) => {
    return await models.Repair.findByPk(repairId);
};


const getRepairData = async (repairId) => {
    return await models.Repair.findOne({
        where: {
            repairId
        },
        include: {
            all: true,
            nested: true
        }
    });
};


const getAnyStartedRepairsForVehicle = async (vehicleId) => {
    return await models.Repair.findOne({
        where: {
            vehicleId,
            status: {
                [Op.in]: [ENTERED_REPAIR, IN_PROGRESS_REPAIR]
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
            status: ENTERED_REPAIR,
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


const editEnteredRepair = async (data, repairId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Repair.update({
            initialDetail: data.initialDetail,
            comments: data.comments
        }, {
            where: {
                repairId
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
    getRepairById,
    getRepairData,
    getAnyStartedRepairsForVehicle,
    isRepairRelatedToAShift,
    changeShiftStatusToEntered,
    createRepair,
    editEnteredRepair
};