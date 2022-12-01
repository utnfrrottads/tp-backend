const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(['shiftDate', 'customerId'], "This field is required.")
        .trim()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


const validateDataTypes = [
    check('shiftDate', "The date format is invalid.")
        .isDate(),
    check('shiftCancellationDate', "The date format is invalid.")
        .custom(value => {
            if (value) {
                return Date.parse(value);
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


const dateIsAfterToday = [
    check('shiftDate', 
        "The date of the selected shift is not valid. It must be after today's date.")
        .isAfter(),
    check('shiftCancellationDate', 
        "The shift cancellation date is not valid. It must be after today's date.")
        .custom(value => {
            if (value) {
                return Date.parse(value) > Date.now();
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes,
    dateIsAfterToday
};