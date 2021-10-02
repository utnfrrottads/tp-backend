const { ApiError, NotFoundError, AttributeMissingError, InvalidAttributeError, InvalidQueryError } = require('../utils/api-error');

function errorHandler(err, req, res, next) {
    // Si el error recibido es desconocido, loggear y retornar temprano con un error 500.
    if (!(err instanceof ApiError)) {
        console.error(err.stack.red);
        res.status(500).json(new ApiError('INTERNAL_ERROR', '¡Ocurrió un error inesperado!'));
        return;
    }

    // Identificamos el tipo de error y devolvemos el código http correspondiente.
    console.error(err);
    if (err instanceof NotFoundError) {
        res.status(404).json(err);
    } else if (err instanceof AttributeMissingError
        || err instanceof InvalidAttributeError
        || err instanceof InvalidQueryError) {
        res.status(400).json(err);
    }
}

module.exports = errorHandler;
