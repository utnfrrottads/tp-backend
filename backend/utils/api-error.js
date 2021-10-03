/**
 * Clase base para encapsular errores esperados.
 */
class ApiError {
    /**
     * @param {string} error La identificación del error. 
     * @param {string} message El detalle especifico del error que ocurrió. 
     */
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
}

/**
 * Error lanzado cuando la entidad con ID seleccionado no pudo ser encontrada.
 */
class NotFoundError extends ApiError {
    /**
     * @param {number} id El ID de la entidad no encontrada.
     * @param {string} [entityClass] El nombre de la entidad. Se usa para devolver un mensaje más preciso al usuario.
     */
    constructor(id, entityClass) {
        if (entityClass === undefined) {
            entityClass = '';
        }
        super('NOT_FOUND', `La entidad ${entityClass} con id '${id}' no fue encontrada.`);
        this.id = id;
    }
}

/**
 * Error lanzado cuando la petición tiene atributos faltantes.
 */
class AttributeMissingError extends ApiError {
    /**
     * @param {(string|string[]|Set)} attributes El atributo o la colección de atributos faltantes.
     */
    constructor(attributes) {
        if (typeof attributes === 'string') {
            attributes = [attributes];
        }
        if (attributes instanceof Set) {
            attributes = [...attributes];
        }
        super('ATTRIBUTE_MISSING', 'Faltan atributos obligatorios en la petición.');
        this.attributes = attributes;
    }
}

/**
 * Error lanzado cuando la petición tiene atributos con valores incorrectos.
 */
class InvalidAttributeError extends ApiError {
    /**
     * @param {string} message El mensaje de validación.
     * @param {string|string[]} attr El o los atributos del incorrectos.
     */
    constructor(message, attr) {
        if (typeof attr === 'string') {
            attr = [attr];
        }
        super('INVALID_ATTRIBUTE', message);
        this.attr = attr;
    }
}

/**
 * Error lanzado cuando la query de la petición tiene parámetros incorrectos.
 */
class InvalidQueryError extends ApiError {
    /**
     * @param {string} message El mensaje de validación.
     * @param {string|string[]} params El o los parámetros de la query incorrectos.
     */
    constructor(message, params) {
        if (typeof params === 'string') {
            params = [params];
        }
        super('INVALID_QUERY', message);
        this.params = params;
    }
}

module.exports = {
    ApiError,
    NotFoundError,
    AttributeMissingError,
    InvalidAttributeError,
    InvalidQueryError,
}
