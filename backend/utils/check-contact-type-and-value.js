const validator = require('validator');

/**
 * Valida que el campo 'valor' contenga un valor válido para el tipo de contacto.
 * @param {Array} contactos - Arreglo de objetos con los datos de los contactos.
 * @returns {boolean} True si el 'valor' es válido para el tipo de contacto en cada objeto contacto. False en caso contrario.
*/
const checkContactTypeAndValue = (contactos) => {
    for (const contacto of contactos) {
        if (!((contacto.tipoContacto === 'email' && validator.isEmail(contacto.valor)) ||
            (contacto.tipoContacto === 'web' && validator.isURL(contacto.valor)) ||
            (contacto.tipoContacto === 'telefono' && validator.isNumeric(contacto.valor)))) {
            return false;
        };
    };
    return true;
};

module.exports = checkContactTypeAndValue;