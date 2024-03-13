const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const shiftService = require('../services/shiftService');
const sparePartService = require('../services/sparePartService');
const { uniqBy } = require('lodash');
const dayjs = require('dayjs');
const { 
    IN_PROGRESS_REPAIR, 
    ENTERED_REPAIR, 
    COMPLETED_REPAIR, 
    DELIVERED_REPAIR
} = require('../utils/repairStatus');


const getRepairById = async (repairId) => {
    return await models.Repair.findByPk(repairId);
};


const getRepairs = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || null;
    const offset = parseInt(queryParams.offset) || null;
    const mechanicId = parseInt(queryParams.mechanicId) || null;
    const status = getFilterByStatus(queryParams.status);
    const where = getWhereClause({status, mechanicId});

    const {count: numberOfRepairs, rows: repairs} = await models.Repair.findAndCountAll({
        include: [
            {
                model: models.Vehicle,
                include: [
                    {
                        model: models.Customer
                    }
                ]
            },
            {
                model: models.Mechanic
            }
        ],
        where,
        limit,
        offset,
        order: [['repairId', 'ASC']]
    });

    return {total: numberOfRepairs, records: repairs};
};


const getRepairData = async (repairId) => {
    return await models.Repair.findOne({
        include: [
            {
                model: models.Vehicle,
                include: [
                    {
                        model: models.Customer
                    }
                ]
            },
            {
                model: models.Mechanic
            },
            {
                model: models.SparePart
            }
        ],
        where: { repairId }
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
            
            const ADD_STOCK = true;
            // Actualizo el stock de cada repuesto sumando las cantidades eliminadas.
            await sparePartService.updateStock(currentlyUsedSpareParts, transaction, ADD_STOCK);
        }
        
        if (modifiedData.spare_parts.length) {
            // Elimino posibles repuestos duplicados, según el sparePartId
            const nonDuplicatedSpareParts = uniqBy(modifiedData.spare_parts, 'repair_spare.sparePartId');

            // Agrego los nuevos repuestos.
            await addSparePartsToRepair(nonDuplicatedSpareParts, repairId, transaction);

            const ADD_STOCK = false;
            // Actualizo el stock de cada repuesto restando las cantidades usadas.
            await sparePartService.updateStock(nonDuplicatedSpareParts, transaction, ADD_STOCK);
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


const changeRepairStatusAndDate = async (data, repair) => {
    repair.status = data.status;
    
    if (data.status === IN_PROGRESS_REPAIR) {
        repair.startDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
        repair.mechanicId = data.mechanicId;
    } else if (data.status === COMPLETED_REPAIR) {
        repair.endDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    } else if (data.status === DELIVERED_REPAIR) {
        repair.deliveryDateTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }

    const transaction = await sequelize.transaction();
    try {
        await repair.save({ transaction });
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


const getFilterByStatus = (status) => {
    const allStatus = [ENTERED_REPAIR, IN_PROGRESS_REPAIR, COMPLETED_REPAIR, DELIVERED_REPAIR];
    
    if (status) {
        status = status.replace(/\+/g, ' ');
        if (status.includes(',')) {
            return status.split(',');
        }
        return status;
    }
    return allStatus;
};


const getWhereClause = (filters) => {
    if (filters.mechanicId) {
        return {
            [Op.and]: [
                { 
                    status: filters.status 
                }, 
                { 
                    mechanicId: filters.mechanicId 
                } 
            ]
        };
    }

    return {
        status: filters.status
    };
};


module.exports = {
    getRepairById,
    getRepairs,
    getRepairData,
    getAnyStartedRepairsForVehicle,
    isRepairRelatedToAShift,
    changeShiftStatusToEntered,
    createRepair,
    deleteRepair,
    editEnteredRepair,
    editInProgressRepair,
    changeRepairStatusAndDate
};