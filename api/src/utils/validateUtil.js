const { validationResult } = require('express-validator');
const { errorMessageFormatter } = require('./errorMessageFormatter');


const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        const formattedError = errorMessageFormatter(error.array());
        next(formattedError);
    }
};


module.exports = {
    validateResult
};