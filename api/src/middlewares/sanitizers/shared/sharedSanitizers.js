const { validateResult } = require('../../../utils/validateUtil');
const { query } = require('express-validator');


const sanitizerQueryParams = [
    query(['query', 'date'])
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    sanitizerQueryParams
};