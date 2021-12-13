const validator = require('validator');
const asyncForEach = require('../utils/async-for-each');

const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
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
    await asyncForEach(experiences , async (experience) => {
        if (experience.tipo_experiencia !== 'academica'
                && experience.tipo_experiencia !== 'laboral') {
            throw new Error('Check tipo_experiencia field');
        }

        if (experience.fecha_inicio !== null) {
            if (!validator.isDate(experience.fecha_inicio)) {
                throw new Error('Check fecha_inicio field');
            }
        }

        if (experience.fecha_fin !== null) {
            if (!validator.isDate(experience.fecha_fin)) {
                throw new Error('Check fecha_fin field');
            }
        }

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

        await asyncForEach(experience.contactos, async (contact) => {
            if ((contact.tipoContacto === 'email' && validator.isEmail(contact.valor)) ||
                    (contact.tipoContacto === 'web' && validator.isURL(contact.valor)) ||
                    (contact.tipoContacto === 'telefono' && validator.isNumeric(contact.valor))) {
                await models.contactos.create({
                    tipoContacto: contact.tipoContacto,
                    valor: contact.valor,
                    experiencias_id_experiencia: newExperience.id_experiencia, // Lo trae de la experiencia previamente creado
                    descripcion: contact.descripcion
                }, { transaction: transaction });
            } else {
                throw new Error('Check \'tipoContacto\' or \'valor\' field');
            }
        });
    });
};

module.exports = {
    createWorkExperience,
    updateWorkExperience
}
