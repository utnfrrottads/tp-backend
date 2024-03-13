const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'licensePlate', 
            'make', 
            'model', 
            'year', 
            'currentNumberOfKilometers',
            'customerId'
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
    check('licensePlate', "The license plate format is invalid. It must be, for example, 'ABC123' or 'AB123CD'.")
        .custom(value => {
            // eslint-disable-next-line indent
                            // Patentes antiguas (ABC123) | Patentes nuevas (AB123CD).
            const regEx = /(^[a-zA-Z]{3}[0-9]{3}$)|(^[a-zA-Z]{2}[0-9]{3}[a-zA-Z]{2}$)/;
            return regEx.test(value);
        }),
    check('year', `The value must be a positive integer number between 1990 and ${new Date().getFullYear()}.`)
        .isInt({ min: 1990, max: new Date().getFullYear() }),
    check('currentNumberOfKilometers', "The value must be a positive integer number or decimal greater than 0.")
        .isFloat({ gt: 0 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes
};