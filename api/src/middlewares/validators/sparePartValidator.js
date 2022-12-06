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
    check('stock', "The value must be a positive integer number greater than 0.")
        .isInt({ gt: 0 }),
    check('sparePartPrice', "The price must be a positive integer number or decimal.")
        .isFloat({ gt: 0 }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    validateMissingValues,
    validateDataTypes
};