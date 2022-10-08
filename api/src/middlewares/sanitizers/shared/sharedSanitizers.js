const { validateResult } = require('../../../utils/validateUtil');
const { query } = require('express-validator');


const sanitizerQueryParam = [
    query('query')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];


module.exports = {
    sanitizerQueryParam
};