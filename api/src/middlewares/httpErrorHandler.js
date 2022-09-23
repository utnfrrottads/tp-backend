const ApiError = require('../utils/apiError');


const httpErrorHandler = (error, req, res, next) => {
    const defaultStatusCode = 500;
    const errorMessage = {
        message: error.message
    };

    if ( error instanceof ApiError ) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            errors: [errorMessage],
            data: {}
        });
    }

    return res.status(defaultStatusCode).json({
        status: defaultStatusCode,
        errors: [errorMessage],
        data: {}
    });
};


module.exports = {
    httpErrorHandler
};