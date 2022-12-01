const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const shiftService = require('../services/shiftService');
const customerService = require('../services/customerService');


const newShift = async (req, res, next) => {
    const shiftDate = req.body.shiftDate;
    const customerId = req.body.customerId;

    try {
        const maximumShiftsPerDay = await shiftService.getMaximumShiftsPerDay();

        const numberOfShiftsForGivenDate = await shiftService.getNumberOfShiftsForGivenDate(shiftDate);

        if (numberOfShiftsForGivenDate >= maximumShiftsPerDay) {
            throw ApiError.badRequest(`You cannot take any more shifts on this day (${shiftDate}).`);
        }

        const customer = await customerService.getCustomerByPk(customerId);

        if (!customer) {
            throw ApiError.badRequest(`Customer with id '${customerId}' does not exist.`);
        }

        const newShift = await shiftService.registerShift(req.body);

        const response = responseCreator(newShift);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newShift
};