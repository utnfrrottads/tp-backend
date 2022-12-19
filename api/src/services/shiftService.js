const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');


const getMaximumShiftsPerDay = async () => {
    const response = await models.Configuration.findAll({
        attributes: ['maximumShiftsPerDay']
    });

    return response[0].maximumShiftsPerDay;
};


const getCountAndShiftsForGivenDate = async (shiftDate) => {
    const {count: numberOfShiftsForGivenDate, rows: shifts} = await models.Shift.findAndCountAll({
        where: {
            shiftDate: shiftDate,
            shiftCancellationDate: {
                [Op.is]: null
            }
        }
    });

    return {numberOfShiftsForGivenDate, shifts};
};


const getShiftsByDate = async (queryParams) => {
    const date = queryParams.date || dayjs().format('YYYY-MM-DD');

    return await models.Shift.findAll({
        include: [
            {
                model: models.Customer,
                required: true
            }
        ],
        where: {
            shiftDate: date,
            status: {
                [Op.in]: ['Stand by']
            }
        }
    });
};


const getShiftsByCustomer = async (customerId) => {
    const today = dayjs().format('YYYY-MM-DD');

    return await models.Shift.findAll({
        include: [
            {
                model: models.Customer,
                required: true
            }
        ],
        where: {
            customerId,
            shiftDate: {
                [Op.gte]: today
            },
            status: {
                [Op.in]: ['Stand by']
            }
        }
    });
};


const getShiftById = async (shiftId) => {
    return await models.Shift.findByPk(shiftId);
};


const getRepairShiftByCustomerId = async (customerId) => {
    return await models.Shift.findOne({
        where: {
            shiftDate: dayjs().format('YYYY-MM-DD'),
            shiftCancellationDate: {
                [Op.is]: null
            },
            status: {
                [Op.in]: ['Stand by']
            },
            customerId
        }
    });
};


const registerShift = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newShift = await models.Shift.create(data, { transaction });
        await transaction.commit();
        
        return newShift;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const cancelShift = async (shiftCancellationDate, shiftId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Shift.update({
            shiftCancellationDate,
            status: 'Cancelled'
        }, {
            where: {
                shiftId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const changeShiftStatusToEntered = async (customerId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.Shift.update({
            status: 'Entered'
        }, {
            where: {
                shiftDate: dayjs().format('YYYY-MM-DD'),
                status: {
                    [Op.in]: ['Stand by']
                },
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
    getMaximumShiftsPerDay,
    getCountAndShiftsForGivenDate,
    getShiftsByDate,
    getShiftsByCustomer,
    getShiftById,
    getRepairShiftByCustomerId,
    registerShift,
    cancelShift,
    changeShiftStatusToEntered
};