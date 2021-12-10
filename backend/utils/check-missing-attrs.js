const { AttributeMissingError } = require("./api-error");

function _checkMissing(data, attrs, prefix) {
    const missing_attrs = [];
    for (const attr of attrs) {
        if (data[attr] == null) {
            missing_attrs.push(attr);
        }
    }
    if (prefix != null) {
        for (var i = 0; i < missing_attrs.length; i++) {
            missing_attrs[i] = prefix + '.' + missing_attrs[i];
        }
    }
    return missing_attrs
}

/**
 * Valida que el objeto tenga los atributos especificados. En caso de pasar una lista, se verifica que todos los objetos de la lista tengan los atributos especificados
 * @param {object} data El objeto a validar.
 * @param {object[]} list La lista de objetos a validar.
 * @param {string[]} attrs La lista de atributos que el objeto debe contener.
 * @param {string} [prefix] El prefijo que se le agrega a los atributos. Usar en caso que se esté validando una estructura anidada.
 */
function checkMissingAttributes() {
    const missing_attrs = new Set();
    for (const validation of arguments) {
        if (!validation.hasOwnProperty('attrs')) {
            throw new TypeError('Argument must have `attrs` attribute defined.');
        }
        if (validation.data != null) {
            _checkMissing(validation.data, validation.attrs, validation.prefix).forEach(attr => missing_attrs.add(attr));
        } else if (validation.list != null) {
            validation.list.forEach(data => {
                _checkMissing(data, validation.attrs, validation.prefix).forEach(attr => missing_attrs.add(attr));
            });
        }
    }
    if (missing_attrs.size > 0) {
        throw new AttributeMissingError(missing_attrs);
    }
}

module.exports = checkMissingAttributes;
