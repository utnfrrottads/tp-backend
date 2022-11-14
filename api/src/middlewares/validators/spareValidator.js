const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'spareCode', 
            'spareDescription', 
            'sparePrice', 
            'stock', 
            'spareSupplier',
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
    check(['spareCode', 'stock'], "The value must be an integer.")
        .isInt(),
    check('sparePrice', "The price format is invalid.")
        .isFloat(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes
};