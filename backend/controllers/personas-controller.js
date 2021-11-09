const validator = require('validator');
const asyncForEach = require('../utils/async-for-each');

const { Op } = require("sequelize");
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

const experienciasController = require('./experiencias-controller');
const { InvalidAttributeError, NotFoundError } = require('../utils/api-error');


createPerson = async (body, tipoPersona) => {
    const transaction = await sequelize.transaction();
    try {
        // Se crea la dirección primero para que se genere el id_dirección y luego poder asignarlo a la persona.
        const newAddress = await models.direcciones.create({
            ciudades_id_ciudad: body.address.id_city,
            codigo_postal: body.address.postal_code,
            calle: body.address.street,
            numero: body.address.street_number,
            departamento: body.address.department,
            piso: body.address.floor
        }, { transaction: transaction });

        if (!validator.isDate(body.date_of_birth)) {
            throw new InvalidAttributeError('Formato de fecha incorrecto.', 'date_of_birth');
        }

        const newPerson = await models.personas.create({
            nombre: body.name,
            apellido: body.surname,
            fecha_nacimiento: body.date_of_birth,
            sexo: body.gender,
            documento: body.dni,
            tipo_persona: tipoPersona,
            direcciones_id_direccion: newAddress.id_direccion
        }, { transaction: transaction });

        await addContact(body.contacts, newPerson.id_persona, transaction);

        if (tipoPersona === 'candidato') {
            await experienciasController.createWorkExperience(body.experiences, newPerson, transaction);
        }
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

updatePerson = async (id_persona, body, tipoPersona) => {
    let transaction = await sequelize.transaction();
    try {
        const person = await models.personas.findOne({
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona },
                ]
            }
        });

        if (!person) {
            throw new NotFoundError('id_persona', tipoPersona);
        }

        if (!validator.isDate(body.date_of_birth)) {
            throw new InvalidAttributeError('Formato de fecha incorrecto.', 'date_of_birth');
        }

        await models.personas.update({
            nombre: body.name,
            apellido: body.surname,
            fecha_nacimiento: body.date_of_birth,
            sexo: body.gender,
            documento: body.dni,
            tipo_persona: body.kind_of_person,
        }, {
            where: { id_persona: id_persona },
            transaction: transaction
        });

        await models.direcciones.update({
            ciudades_id_ciudad: body.address.id_city,
            codigo_postal: body.address.postal_code,
            calle: body.address.street,
            numero: body.address.street_number,
            departamento: body.address.department,
            piso: body.address.floor
        }, {
            where: { id_direccion: person.direcciones_id_direccion },
            transaction: transaction
        });

        await models.contactos.destroy({ 
            where: { personas_id_persona: id_persona },
            transaction: transaction
        });

        await addContact(body.contacts, id_persona, transaction);

        if (tipoPersona === 'candidato') {
            await experienciasController.updateWorkExperience(body.experiences, id_persona, transaction);
        }

        await transaction.commit();

    } catch ( error ) {
        await transaction.rollback();
        throw error;
    }
};

deletePerson = async (id_persona, tipoPersona) => {
    const transaction = await sequelize.transaction();
    try {
        const addressToDelete = await models.personas.findOne({
            attributes: ['direcciones_id_direccion'],
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona }
                ]
            }
        });

        if (!addressToDelete) {
            throw new NotFoundError('id_persona', tipoPersona);
        }

        const result = await models.personas.destroy({
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona }
                ]
            },
            transaction: transaction 
        });

        if (result <= 0) {
            throw new NotFoundError('id_persona', tipoPersona);
        }

        await models.direcciones.destroy({
            where: { id_direccion: addressToDelete.direcciones_id_direccion },
            transaction: transaction,
        });

        await transaction.commit();
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

/**
 * Crea los contactos de una persona.
 */
const addContact = async (contacts, id_persona, transaction) => {
    await asyncForEach(contacts, async (contact) => {
        if ((contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                (contact.contact_type === 'telefono' && validator.isNumeric(contact.value))) {
    
            await models.contactos.create({
                tipoContacto: contact.contact_type,
                valor: contact.value,
                personas_id_persona: id_persona,
                descripcion: contact.contact_description
            }, { transaction: transaction });
        } else {
            throw new Error('Check contact_type or value field');
        }
    });
};

module.exports = {
    createPerson,
    updatePerson,
    deletePerson,
};
