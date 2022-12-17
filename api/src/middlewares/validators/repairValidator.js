const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'vehicleId'
        ], 
        "This field is required."
    )
        .trim()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


const validateDataTypes = [
    check('startDateTime', "The date format is invalid.")
        .custom(value => {
            if (value) {
                return Date.parse(value);
            }
            return true;
        }),
    check('endDateTime', "The date format is invalid.")
        .custom(value => {
            if (value) {
                return Date.parse(value);
            }
            return true;
        }),
    check('deliveryDateTime', "The date format is invalid.")
        .custom(value => {
            if (value) {
                return Date.parse(value);
            }
            return true;
        }),
    check('laborPrice', "The value must be a positive integer number or decimal greater than 0.")
        .custom(value => {
            if (value) {
                return value.isFloat({ gt: 0 });
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes
};