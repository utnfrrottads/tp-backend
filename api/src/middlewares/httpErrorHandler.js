const ApiError = require('../utils/apiError');


// eslint-disable-next-line no-unused-vars
const httpErrorHandler = (error, req, res, next) => {
    const defaultStatusCode = error.status || 500; // Si el error viene de validaciones setea la variable con el valor "error.status". Sino con 500.
    const errorMessage = error.errors || [{ message: error.message }]; // Si el error viene de validaciones, setea la variable con el valor "error.errors". Sino con "[{ message: error.message }]".

    if ( error instanceof ApiError ) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            errors: errorMessage,
            data: []
        });
    }

    return res.status(defaultStatusCode).json({
        status: defaultStatusCode,
        errors: errorMessage,
        data: []
    });
};


module.exports = {
    httpErrorHandler
};