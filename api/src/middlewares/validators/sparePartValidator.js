const { validateResult } = require('../../utils/validateUtil');
const { check } = require('express-validator');


const validateMissingValues = [
    check(
        [
            'sparePartCode', 
            'sparePartDescription', 
            'sparePartPrice', 
            'stock', 
            'sparePartSupplier',
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
    check(['sparePartCode', 'stock'], "The value must be an integer.")
        .isInt(),
    check('sparePartPrice', "The price format is invalid.")
        .isFloat(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes
};