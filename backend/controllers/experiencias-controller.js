const validator = require('validator');
const checkContactTypeAndValue = require('../utils/check-contact-type-and-value');
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { InvalidAttributeError } = require('../utils/api-error');
const models = initModels(sequelize);

createWorkExperience = async (experiences, newPerson, transaction) => {
    await addWorkExperience(experiences, newPerson.id_persona, transaction);
};

updateWorkExperience = async (experiences, id_persona, transaction) => {
    await models.experiencias.destroy({
        where: {
            personas_id_persona: id_persona
        }, transaction: transaction });
    await addWorkExperience(experiences, id_persona, transaction);
};

/**
 * Agrega las nuevas experiencias de un candidato.
 */
const addWorkExperience = async (experiences, id_persona, transaction) => {
    for await (const experience of experiences) {
        if (experience.tipo_experiencia !== 'academica'
                && experience.tipo_experiencia !== 'laboral') {
            throw new InvalidAttributeError('Verificar que el campo \'tipo_experiencia\' tiene el valor \'academica\' o \'laboral\'', 'tipo_experiencia');
        };

        if (experience.fecha_inicio !== null) {
            if (!validator.isDate(experience.fecha_inicio)) {
                throw new InvalidAttributeError('El formato del campo \'fecha_inicio\' es inválido', 'fecha_inicio');
            };
        };

        if (experience.fecha_fin !== null) {
            if (!validator.isDate(experience.fecha_fin)) {
                throw new InvalidAttributeError('El formato del campo \'fecha_fin\' es inválido', 'fecha_fin');
            };
        };

        const newExperience = await models.experiencias.create({
            institucion: experience.institucion,
            descripcion: experience.descripcion,
            fecha_inicio: experience.fecha_inicio,
            fecha_fin: experience.fecha_fin,
            competencias: experience.competencias,
            tipo_experiencia: experience.tipo_experiencia,
            finalizada: experience.finalizada,
            personas_id_persona: id_persona
        }, { transaction: transaction });

        await addContact(experience.contactos, newExperience.id_experiencia, transaction);
    };
};


/**
 * Crea los contactos de una empresa cuando esta última es modificada.
*/
const addContact = async (contactos, id_experiencia, transaction) => {
    if ( checkContactTypeAndValue(contactos) ) {
        await models.contactos.bulkCreate(contactos.map(contacto => {
            return {
                tipoContacto: contacto.tipoContacto,
                valor: contacto.valor,
                experiencias_id_experiencia: id_experiencia, // Lo trae de la experiencia previamente creado
                descripcion: contacto.descripcion
            }
        }), { transaction: transaction });
    } else {
        throw new InvalidAttributeError('Verificar que el campo \'valor\' corresponda al campo \'tipoContacto\' definido dentro del contacto de la experiencia', ['tipoContacto', 'valor']);
    };
};

module.exports = {
    createWorkExperience,
    updateWorkExperience
};