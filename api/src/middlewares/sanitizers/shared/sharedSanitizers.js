const { validateResult } = require('../../../utils/validateUtil');
const { query, body } = require('express-validator');


const sanitizerQueryParams = [
    query(['query', 'date'])
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


const sanitizerToUpperCase = [
    body('licensePlate')
        .toUpperCase(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    sanitizerQueryParams,
    sanitizerToUpperCase
};