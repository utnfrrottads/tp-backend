const validator = require('validator');
const asyncForEach = require('../sharedFunctions/asyncForEach');

const { Op } = require("sequelize");
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

const experienciasController = require('./experiencias-controller');


// Dar de alta una persona, ya sea candidato o evaluador
createPerson = async ( body, tipoPersona ) => {
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

        if ( !validator.isDate(body.date_of_birth) ) { // Si la fecha no es del formato correcto
            throw new Error('Check date_of_birth field');
        }

        const newPerson = await models.personas.create({
            nombre: body.name,
            apellido: body.surname,
            fecha_nacimiento: body.date_of_birth,
            sexo: body.gender,
            documento: body.dni,
            tipo_persona: tipoPersona,
            direcciones_id_direccion: newAddress.id_direccion // Lo trae de la dirección previamente creado
        }, { transaction: transaction });

        await addContact( body.contacts, newPerson.id_persona, transaction );

        if ( tipoPersona === 'candidato' ) {
            await experienciasController.createWorkExperience( body.experiences, newPerson, transaction );
        }

        await transaction.commit();
        
    } catch ( error ) {
        await transaction.rollback();
        throw error;
    };
};


// Modificar los datos de una persona, ya sea candidato o evaluador
updatePerson = async ( id_persona, body, tipoPersona ) => {
    let transaction = await sequelize.transaction();
    try {
        if ( !id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
            throw new Error('Param is missing');
        }

        const person = await models.personas.findOne({
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona }
                ]
            }
        });

        if ( !person ) { // Si no existe una persona con ese id
            throw new Error (`Person with ID ${id_persona} not found`);
        }

        if ( !validator.isDate(body.date_of_birth) ) { // Si la fecha no es del formato correcto
            throw new Error('Check date_of_birth field');
        }

        await models.personas.update({
            nombre: body.name,
            apellido: body.surname,
            fecha_nacimiento: body.date_of_birth,
            sexo: body.gender,
            documento: body.dni,
            tipo_persona: body.kind_of_person,
        },
        {
            where: {
                id_persona: id_persona
            },
            transaction: transaction });
    
        await models.direcciones.update({
            ciudades_id_ciudad: body.address.id_city,
            codigo_postal: body.address.postal_code,
            calle: body.address.street,
            numero: body.address.street_number,
            departamento: body.address.department,
            piso: body.address.floor
        },
        {
            where: {
                id_direccion: person.direcciones_id_direccion
            },
            transaction: transaction });

        await models.contactos.destroy({ 
            where: {
                personas_id_persona: id_persona
            }, transaction: transaction });

        await addContact( body.contacts, id_persona, transaction );
    
        if ( tipoPersona === 'candidato' ) {
            await experienciasController.updateWorkExperience( body.experiences, id_persona, transaction );
        }

        await transaction.commit();
        
    } catch ( error ) {
        await transaction.rollback();
        throw error;
    }
};


// Eliminar una persona, ya sea candidato o evaluador
deletePerson = async ( id_persona, tipoPersona ) => {
    const transaction = await sequelize.transaction();
    try {
        if ( !id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
            throw new Error('Param is missing');
        }

        const addressToDelete = await models.personas.findOne({
            attributes: ['direcciones_id_direccion'],
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona }
                ]
            }
        });

        if ( !addressToDelete ) { // Si la direccion a eliminar no existe
            throw new Error(`There is no a person with ID ${id_persona}`);
        }

        const personDeleted = await models.personas.destroy({
            where: {
                [Op.and]: [
                    { id_persona: id_persona },
                    { tipo_persona: tipoPersona }
                ]
            }, transaction: transaction });

        if( personDeleted === 0 ) { // Si la cláusula where falla y por lo tanto no se elimina ninguna persona
            throw new Error('Can\'t delete person');
        }

        await models.direcciones.destroy({
            where: {
                id_direccion: addressToDelete.direcciones_id_direccion
            }, transaction: transaction });

        await transaction.commit();
        
    } catch ( error ) {
        await transaction.rollback();
        throw error;
    };
};


/**
 * Esta funcion crea los contactos de una persona
 */
const addContact = async ( contacts, id_persona, transaction ) => {
    try {
        await asyncForEach( contacts, async (contact) => {
            if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                 (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                 (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
        
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
    } catch (error) {
        throw error;
    }
};



module.exports = {
    createPerson,
    updatePerson,
    deletePerson
};