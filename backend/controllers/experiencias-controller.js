const validator = require('validator');
const asyncForEach = require('../utils/async-for-each');

const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


createWorkExperience = async ( experiences, newPerson, transaction ) => {
    try {
        await addWorkExperience( experiences, newPerson.id_persona, transaction );

    } catch (error) {
        throw error;
    }
};


updateWorkExperience = async ( experiences, id_persona, transaction ) => {
    try {

        await models.experiencias.destroy({
            where: {
                personas_id_persona: id_persona
            }, transaction: transaction });

        await addWorkExperience( experiences, id_persona, transaction );

    } catch (error) {
        throw error;
    }
};


/**
 * Esta funcion agrega las nuevas experiencias de un candidato
 */
const addWorkExperience = async ( experiences, id_persona, transaction ) => {
    try {
        await asyncForEach( experiences , async (experience) => {
            if ( experience.type_of_experience !== 'academica' && 
                 experience.type_of_experience !== 'laboral' ) {
                    throw new Error('Check type_of_experience field');
            }
    
            if ( experience.start_date !== null ) {
                if ( !validator.isDate(experience.start_date) ) {
                    throw new Error('Check start_date field');
                }
            }
    
            if ( experience.end_date !== null ) {
                if ( !validator.isDate(experience.end_date) ) {
                    throw new Error('Check end_date field');
                }
            }
    
            const newExperience = await models.experiencias.create({
                institucion: experience.institution,
                descripcion: experience.experience_description,
                fecha_inicio: experience.start_date,
                fecha_fin: experience.end_date,
                competencias: experience.skills,
                tipo_experiencia: experience.type_of_experience,
                finalizada: experience.finished,
                personas_id_persona: id_persona
            }, { transaction: transaction });
    
            await asyncForEach( experience.contacts, async (contact) => {
                if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                     (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                     (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
                    
                        await models.contactos.create({
                            tipoContacto: contact.contact_type,
                            valor: contact.value,
                            experiencias_id_experiencia: newExperience.id_experiencia, // Lo trae de la experiencia previamente creado
                            descripcion: contact.contact_description
                        }, { transaction: transaction });
                } else {
                    throw new Error('Check contact_type or value field');
                }
            });
        });

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createWorkExperience,
    updateWorkExperience
}