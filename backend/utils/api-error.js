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
     * @param {object[]} validations Las validaciones que fallaron.
     * @param {string} validations[].attribute El atributo que tiene un valor incorrecto.
     * @param {string} validations[].detail La descripción del error que ocurrió.
     */
    constructor(validations) {
        super('INVALID_ATTRIBUTE', 'Se ingresaron atributos con valores inválidos.');
        this.validations = validations;
    }
}

module.exports = {
    ApiError,
    NotFoundError,
    AttributeMissingError,
    InvalidAttributeError,
}
