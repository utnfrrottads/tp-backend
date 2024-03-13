const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');
const dayjs = require('dayjs');
const { STAND_BY_SHIFT, ENTERED_SHIFT, CANCELLED_SHIFT } = require('../utils/shiftStatus');


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


const searchShifts = async (queryParams) => {
    const date = queryParams.date;
    const customer = queryParams.customer || '';

    const shiftDateWhere = getFilterByDate(date);

    const {count: numberOfShifts, rows: shifts} = await models.Shift.findAndCountAll({
        include: [
            {
                model: models.Customer,
                required: true,
                where: {
                    [Op.or]: [
                        {
                            firstName: {
                                [Op.substring]: customer
                            },
                        },
                        {
                            lastName: {
                                [Op.substring]: customer
                            }
                        }
                    ] 
                }
            }
        ],
        where: shiftDateWhere
    });

    return {total: numberOfShifts, records: shifts};
};


const getShiftById = async (shiftId) => {
    return await models.Shift.findByPk(shiftId, {
        include: models.Customer
    });
};


const getRepairShiftByCustomerId = async (customerId) => {
    return await models.Shift.findOne({
        where: {
            shiftDate: dayjs().format('YYYY-MM-DD'),
            shiftCancellationDate: {
                [Op.is]: null
            },
            status: {
                [Op.in]: [STAND_BY_SHIFT]
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
            status: CANCELLED_SHIFT
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
            status: ENTERED_SHIFT
        }, {
            where: {
                shiftDate: dayjs().format('YYYY-MM-DD'),
                status: {
                    [Op.in]: [STAND_BY_SHIFT]
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


const getFilterByDate = (date) => {
    if (date) return { shiftDate: date };

    const today = dayjs().format('YYYY-MM-DD');
    return { 
        shiftDate: { 
            [Op.gte]: today
        } 
    };
};


module.exports = {
    getMaximumShiftsPerDay,
    getCountAndShiftsForGivenDate,
    searchShifts,
    getShiftById,
    getRepairShiftByCustomerId,
    registerShift,
    cancelShift,
    changeShiftStatusToEntered
};