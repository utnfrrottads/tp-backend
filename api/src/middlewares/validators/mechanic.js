const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'registrationNumber', 
            'firstName', 
            'lastName', 
            'street', 
            'streetNumber', 
            'city', 
            'province', 
            'email'
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
    check('registrationNumber', "The field must contain only numbers.")
        .isNumeric(),
    check('email', "The email format is invalid.")
        .isEmail(),
    check('phoneNumber', "The field must contain only numbers.")
        .custom(value => {
            if (value) {
                return !isNaN(value);
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