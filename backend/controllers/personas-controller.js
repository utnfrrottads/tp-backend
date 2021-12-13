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
        const newAddress = await models.direcciones.create(body.direccion, { transaction: transaction });

        if (!validator.isDate(body.fecha_nacimiento)) {
            throw new InvalidAttributeError('Formato de fecha incorrecto.', 'fecha_nacimiento');
        }

        const newPerson = await models.personas.create({
            nombre: body.nombre,
            apellido: body.apellido,
            fecha_nacimiento: body.fecha_nacimiento,
            sexo: body.sexo,
            documento: body.documento,
            tipo_persona: tipoPersona,
            direcciones_id_direccion: newAddress.id_direccion
        }, { transaction: transaction });

        await addContact(body.contactos, newPerson.id_persona, transaction);

        if (tipoPersona === 'candidato') {
            await experienciasController.createWorkExperience(body.experiencias, newPerson, transaction);
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

        if (!validator.isDate(body.fecha_nacimiento)) {
            throw new InvalidAttributeError('Formato de fecha incorrecto.', 'fecha_nacimiento');
        }

        await models.personas.update(body, {
            where: { id_persona: id_persona },
            transaction: transaction
        });

        await models.direcciones.update(body.direccion, {
            where: { id_direccion: person.direcciones_id_direccion },
            transaction: transaction
        });

        await models.contactos.destroy({ 
            where: { personas_id_persona: id_persona },
            transaction: transaction
        });

        await addContact(body.contactos, id_persona, transaction);

        if (tipoPersona === 'candidato') {
            await experienciasController.updateWorkExperience(body.experiencias, id_persona, transaction);
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
        if ((contact.tipoContacto === 'email' && validator.isEmail(contact.valor)) ||
                (contact.tipoContacto === 'web' && validator.isURL(contact.valor)) ||
                (contact.tipoContacto === 'telefono' && validator.isNumeric(contact.valor))) {
    
            await models.contactos.create({
                tipoContacto: contact.tipoContacto,
                valor: contact.valor,
                personas_id_persona: id_persona,
                descripcion: contact.descripcion
            }, { transaction: transaction });
        } else {
            throw new Error('Check \'tipoContacto\' or \'valor\' field');
        }
    });
};

module.exports = {
    createPerson,
    updatePerson,
    deletePerson,
};
