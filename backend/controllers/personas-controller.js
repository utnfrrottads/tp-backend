const asyncForEach = require('../sharedFunctions/asyncForEach');
const validator = require('validator');

const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);


// Dar de alta una persona, ya sea candidato o evaluador
createPerson = async ( body, tipoPersona ) => {
    const transaction = await sequelize.transaction();
    try {
        // Se crea la dirección primero para que se genere el id_dirección y luego poder asignarlo al evaluador
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

        const newEvaluator = await models.personas.create({
            nombre: body.name,
            apellido: body.surname,
            fecha_nacimiento: body.date_of_birth,
            sexo: body.gender,
            documento: body.dni,
            tipo_persona: tipoPersona,
            direcciones_id_direccion: newAddress.id_direccion // Lo trae de la dirección previamente creado
        }, { transaction: transaction });

        // Esta funcion sirve para que cree todos los contactos y cuando termina haga el commit
        await asyncForEach( body.contacts, async (contact) => {
            if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
                 (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
                 (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
                
                    await models.contactos.create({
                        tipoContacto: contact.contact_type,
                        valor: contact.value,
                        personas_id_persona: newEvaluator.id_persona, // Lo trae del evaluador previamente creado
                        descripcion: contact.contact_description
                    }, { transaction: transaction });
            } else {
                throw new Error('Check contact_type or value field');
            }
        });

        await transaction.commit();
        
    } catch ( error ) {
        await transaction.rollback();
        console.log(error);
    };
};


// Dar de baja un evaluador.
// personController.deleteEvaluator = async ( req, res ) => {
//     const transaction = await sequelize.transaction();
//     try {
//         if ( !req.params.id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
//             throw new Error('Param is missing');
//         }

//         const addressToDelete = await Person.findOne({
//             attributes: ['direcciones_id_direccion'],
//             where: {
//                 id_persona: req.params.id_persona
//             }
//         });

//         if ( !addressToDelete ) { // Si la direccion a eliminar no existe
//             throw new Error('There is no an evaluator with that ID');
//         }

//         const evaluatorDeleted = await Person.destroy({
//             where: {
//                 [Op.and]: [
//                     { id_persona: req.params.id_persona },
//                     { tipo_persona: 'evaluador' }
//                 ]
//             }, transaction: transaction });

//         if( evaluatorDeleted === 0 ) { // Si la cláusula where falla y no se elimina ningún evaluador
//             throw new Error('Can\'t delete evaluator');
//         }

//         await Address.destroy({
//             where: {
//                 id_direccion: addressToDelete.direcciones_id_direccion
//             }, transaction: transaction });

//         await Contact.destroy({
//             where: {
//                 personas_id_persona: req.params.id_persona
//             }, transaction: transaction });

//         await transaction.commit();
//         res.status(200).json('Evaluator deleted successfully');

//     } catch ( error ) {
//         await transaction.rollback();
//         res.status(400).json( error.message );
//     };
// };


// // Modificar los datos de un evaluador
// personController.updateEvaluator = async ( req, res ) => {
//     let transaction = await sequelize.transaction();
//     try {
//         if ( !req.params.id_persona ) { // Si no existe el parámetro entonces lanza un error que lo toma el catch
//             throw new Error('Param is missing');
//         }

//         const evaluator = await Person.findByPk( req.params.id_persona );

//         if ( !evaluator ) { // Si no existe un evaluador con ese id
//             throw new Error ('Evaluator not found');
//         }

//         if ( !validator.isDate(body.date_of_birth) ) { // Si la fecha no es del formato correcto
//             throw new Error('Check date_of_birth field');
//         }

//         await Person.update({
//             nombre: body.name,
//             apellido: body.surname,
//             fecha_nacimiento: body.date_of_birth,
//             sexo: body.gender,
//             documento: body.dni,
//             tipo_persona: body.kind_of_person,
//         },
//         {
//             where: {
//                 id_persona: req.params.id_persona
//             },
//             transaction: transaction });
    
//         await Address.update({
//             ciudades_id_ciudad: body.address.id_city,
//             codigo_postal: body.address.postal_code,
//             calle: body.address.street,
//             numero: body.address.street_number,
//             departamento: body.address.department,
//             piso: body.address.floor
//         },
//         {
//             where: {
//                 id_direccion: evaluator.direcciones_id_direccion
//             },
//             transaction: transaction });

//         await Contact.destroy({ 
//             where: {
//                 personas_id_persona: req.params.id_persona
//             }, transaction: transaction });

//         // Esta funcion sirve para que cree todos los contactos y cuando termina haga el commit
//         await asyncForEach( body.contacts, async (contact) => {
//             if ( (contact.contact_type === 'email' && validator.isEmail(contact.value)) ||
//                  (contact.contact_type === 'web' && validator.isURL(contact.value)) ||
//                  (contact.contact_type === 'telefono' && validator.isNumeric(contact.value)) ) {
        
//                     await Contact.create({
//                         tipoContacto: contact.contact_type,
//                         valor: contact.value,
//                         personas_id_persona: req.params.id_persona,
//                         descripcion: contact.contact_description
//                     }, { transaction: transaction });
//             } else {
//                 throw new Error('Check contact_type or value field');
//             }
//         });
    
//         await transaction.commit();
//         res.status(200).json('Evaluator updated successfully');
    
//     } catch ( error ) {
//         await transaction.rollback();
//         res.status(400).json( error.message );
//     }
// };

// module.exports = personController;
module.exports = {
    createPerson
}