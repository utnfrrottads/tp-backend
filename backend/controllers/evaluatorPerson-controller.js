const asyncForEach = require('../sharedFunctions/asyncForEach');
const validator = require('validator');

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db-connection');
const Person = require('../models/personas')(sequelize, DataTypes);
const Address = require('../models/direcciones')(sequelize, DataTypes);
const Contact = require('../models/contactos')(sequelize, DataTypes);


// Se asigna la clave foránea a Person
Address.hasOne( Person, { foreignKey: 'direcciones_id_direccion' } );
Person.belongsTo( Address, { foreignKey: 'direcciones_id_direccion' } );

Person.hasMany( Contact, { foreignKey: 'personas_id_persona'} );
Contact.belongsTo( Person, { foreignKey: 'personas_id_persona' } );

const evaluatorPersonController = { };


// Dar de alta un evaluador
evaluatorPersonController.createEvaluator = async ( req, res ) => {
    
    const transaction = await sequelize.transaction();

    try {

        // Se crea la dirección primero para que se genere el id_dirección y luego poder asignarlo al evaluador
        const newAddress = await Address.create({
            ciudades_id_ciudad: req.body.address.id_city,
            codigo_postal: req.body.address.postal_code,
            calle: req.body.address.street,
            numero: req.body.address.street_number,
            departamento: req.body.address.department,
            piso: req.body.address.floor
        }, { transaction: transaction });

        if ( !validator.isDate(req.body.date_of_birth) ) { // Si la fecha no es del formato correcto
            throw new Error('check date_of_birth field');
        }

        const newEvaluator = await Person.create({
            nombre: req.body.name,
            apellido: req.body.surname,
            fecha_nacimiento: req.body.date_of_birth,
            sexo: req.body.gender,
            documento: req.body.dni,
            tipo_persona: req.body.kind_of_person,
            direcciones_id_direccion: newAddress.id_direccion // Lo trae de la dirección previamente creado
        }, { transaction: transaction });

        // Esta funcion sirve para que cree todos los contactos y cuando termina haga el commit
        await asyncForEach( req.body.contacts, async (contact) => {
            if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                 (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                 (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
                
                    await Contact.create({
                        tipoContacto: contact.contact_type,
                        valor: contact.value,
                        personas_id_persona: newEvaluator.id_persona, // Lo trae del evaluador previamente creado
                        descripcion: contact.contact_description
                    }, { transaction: transaction });
            } else {
                throw new Error('check contact_type or value field');
            }
        });

        await transaction.commit();
        res.status(200).json('Evaluator created successfully');

    } catch ( error ) {
        await transaction.rollback();
        res.status(400).json( error.message );
    };
};


// Dar de baja un evaluador.
evaluatorPersonController.deleteEvaluator = async ( req, res ) => {
    
    const transaction = await sequelize.transaction();

    try {
        if ( !req.params.id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
            throw new Error('Param is missing');
        }

        const addressToDelete = await Person.findOne({
            attributes: ['direcciones_id_direccion'],
            where: {
                id_persona: req.params.id_persona
            }
        });

        if ( !addressToDelete ) { // Si la direccion a eliminar no existe
            throw new Error('There is no an evaluator with that ID');
        }

        const evaluatorDeleted = await Person.destroy({
            where: {
                [Op.and]: [
                    { id_persona: req.params.id_persona },
                    { tipo_persona: 'evaluador' }
                ]
            }
        }, { transaction: transaction });

        if( evaluatorDeleted === 0 ) { // Si la cláusula where falla y no se elimina ningún evaluador
            throw new Error('Can\'t delete evaluator');
        }

        await Address.destroy({
            where: {
                id_direccion: addressToDelete.direcciones_id_direccion
            }
        }, { transaction: transaction });

        await Contact.destroy({
            where: {
                personas_id_persona: req.params.id_persona
            }
        }, { transaction: transaction });

        await transaction.commit();
        res.status(200).json('Evaluator deleted successfully');

    } catch ( error ) {
        await transaction.rollback();
        res.status(400).json( error.message );
    };
};


// Modificar los datos de un evaluador
evaluatorPersonController.updateEvaluator = async ( req, res ) => {
    
    const transaction = await sequelize.transaction();

    try {

        if ( !req.params.id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
            throw new Error('Param is missing');
        }

        const evaluator = await Person.findByPk( req.params.id_persona );

        if ( !evaluator ) { // Si no existe un evaluador con ese id
            throw new Error ('Evaluator not found');
        }

        if ( !validator.isDate(req.body.date_of_birth) ) { // Si la fecha no es del formato correcto
            throw new Error('check date_of_birth field');
        }

        await Person.update({
            nombre: req.body.name,
            apellido: req.body.surname,
            fecha_nacimiento: req.body.date_of_birth,
            sexo: req.body.gender,
            documento: req.body.dni,
            tipo_persona: req.body.kind_of_person,
        },
        {
            where: {
                id_persona: req.params.id_persona
            }
        }, { transaction: transaction });
    
        await Address.update({
            ciudades_id_ciudad: req.body.address.id_city,
            codigo_postal: req.body.address.postal_code,
            calle: req.body.address.street,
            numero: req.body.address.street_number,
            departamento: req.body.address.department,
            piso: req.body.address.floor
        },
        {
            where: {
                id_direccion: evaluator.direcciones_id_direccion
            }
        }, { transaction: transaction });

        await Contact.destroy({
            where: {
                personas_id_persona: req.params.id_persona 
            }
        }, { transaction: transaction });

        // Esta funcion sirve para que cree todos los contactos y cuando termina haga el commit
        await asyncForEach( req.body.contacts, async (contact) => {
            if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                    (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                    (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
                    
                    await Contact.create({
                        tipoContacto: contact.contact_type,
                        valor: contact.value,
                        personas_id_persona: req.params.id_persona,
                        descripcion: contact.contact_description
                    }, { transaction: transaction });
            } else {
                throw new Error('check contact_type or value field');
            }
        });

        await transaction.commit();
        res.status(200).json('Evaluator updated successfully');
    
    } catch ( error ) {
        await transaction.rollback();
        res.status(400).json( error.message );
    }
};

module.exports = evaluatorPersonController;