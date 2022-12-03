const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const shiftService = require('../services/shiftService');
const customerService = require('../services/customerService');
const dayjs = require('dayjs');


const newShift = async (req, res, next) => {
    const {shiftDate, customerId} = req.body;

    try {
        const maximumShiftsPerDay = await shiftService.getMaximumShiftsPerDay();

        const numberOfShiftsForGivenDate = await shiftService.getNumberOfShiftsForGivenDate(shiftDate);

        if (numberOfShiftsForGivenDate >= maximumShiftsPerDay) {
            throw ApiError.badRequest(`You cannot take any more shifts on this day (${shiftDate}).`);
        }

        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
            throw ApiError.badRequest(`Customer with id '${customerId}' does not exist.`);
        }

        const newShift = await shiftService.registerShift({shiftDate, customerId});

        const response = responseCreator(newShift);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const cancelShift = async (req, res, next) => {
    const shiftId = req.params.shiftId;

    try {
        const shiftToCancel = await shiftService.getShiftById(shiftId);

        if (!shiftToCancel) {
            throw ApiError.notFound(`The shift with id '${shiftId}' not found.`);
        }

        if (shiftToCancel.shiftCancellationDate) {
            throw ApiError.badRequest(`The shift with id '${shiftId}' is already cancelled.`);
        }

        const shiftCancellationDate = dayjs().format('YYYY-MM-DD');

        if (shiftToCancel.shiftDate < shiftCancellationDate) {
            throw ApiError.badRequest(`The shift with id '${shiftId}' cannot be cancelled because the shift date is prior to today's date.`);
        }

        await shiftService.cancelShift(shiftCancellationDate, shiftId);

        const response = responseCreator(shiftToCancel);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getShiftsByDate = async (req, res, next) => {
    try {
        const shiftsByDate = await shiftService.getShiftsByDate(req.query);

        const response = responseCreator(shiftsByDate);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newShift,
    cancelShift,
    getShiftsByDate
};