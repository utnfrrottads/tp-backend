const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const shiftService = require('../services/shiftService');
const sparePartService = require('../services/sparePartService');
const { IN_PROGRESS_REPAIR, ENTERED_REPAIR } = require('../utils/repairStatus');
const { uniqBy } = require('lodash');


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


const deleteRepair = async (repairId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Repair.destroy({
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


const editEnteredRepair = async (modifiedData, repairId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Repair.update({
            initialDetail: modifiedData.initialDetail,
            comments: modifiedData.comments
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


const editInProgressRepair = async (modifiedData, repairId) => {
    const transaction = await sequelize.transaction();

    try {
        const currentlyUsedSpareParts = await getCurrentlyUsedSpareParts(repairId);

        if (currentlyUsedSpareParts.length) {
            // Borro todos los repuestos usados en la reparación.
            await deleteSparePartsUsedInRepair(repairId, transaction);
            
            // Actualizo el stock de cada repuesto sumando las cantidades eliminadas.
            await sparePartService.updateStock(currentlyUsedSpareParts, transaction, true);
        }
        
        if (modifiedData.spare_parts.length) {
            // Elimino posibles repuestos duplicados, según el sparePartId
            const nonDuplicatedSpareParts = uniqBy(modifiedData.spare_parts, 'repair_spare.sparePartId');

            // Agrego los nuevos repuestos.
            await addSparePartsToRepair(nonDuplicatedSpareParts, repairId, transaction);

            // Actualizo el stock de cada repuesto restando las cantidades usadas.
            await sparePartService.updateStock(nonDuplicatedSpareParts, transaction, false);
        }

        await models.Repair.update({
            initialDetail: modifiedData.initialDetail,
            comments: modifiedData.comments,
            finalDescription: modifiedData.finalDescription,
            laborPrice: modifiedData.laborPrice
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


const getCurrentlyUsedSpareParts = async (repairId) => {
    const repairWithSpareParts = await models.Repair.findOne({
        include: [
            {
                model: models.SparePart,
                required: true
            },
        ],
        where: {
            repairId
        }
    });

    let currentlyUsedSpareParts = [];

    if (repairWithSpareParts) {
        currentlyUsedSpareParts = repairWithSpareParts.spare_parts.map(sparePart => {
            return sparePart.get({ plain: true });
        });
    }

    return currentlyUsedSpareParts;
};


const deleteSparePartsUsedInRepair = async (repairId, transaction) => {
    await models.RepairSpare.destroy({
        where: {
            repairId
        },
        transaction
    });
};


const addSparePartsToRepair = async (nonDuplicatedSpareParts, repairId, transaction) => {
    const newRepairSpareRecords = nonDuplicatedSpareParts.map(sparePart => {
        sparePart.repair_spare.repairId = repairId;
        return sparePart.repair_spare;
    });

    await models.RepairSpare.bulkCreate(newRepairSpareRecords, { transaction });
};


module.exports = {
    getRepairById,
    getRepairData,
    getAnyStartedRepairsForVehicle,
    isRepairRelatedToAShift,
    changeShiftStatusToEntered,
    createRepair,
    deleteRepair,
    editEnteredRepair,
    editInProgressRepair
};