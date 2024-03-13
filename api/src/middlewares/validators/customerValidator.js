const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'dni', 
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
    // Si NO se ingresa el valor de "floor" y SI el de "apartment", se muestra mensaje. 
    check('floor', 'This field is required.')
        .custom((value, {req}) => {
            if (!value && req.body.apartment) {
                return false;
            }
            return true;
        }),
    // Si NO se ingresa el valor de "apartment" y SI el de "floor", se muestra mensaje.
    check('apartment', 'This field is required.')
        .custom((value, {req}) => {
            if (!value && req.body.floor) {
                return false;
            }
            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


const validateDataTypes = [
    check('dni', "The field must contain only numbers.")
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