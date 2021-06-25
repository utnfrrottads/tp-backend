const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Person = require('../models/personas')(sequelize, DataTypes);
const Address = require('../models/direcciones')(sequelize, DataTypes);
const Contact = require('../models/contactos')(sequelize, DataTypes);
// const City = require('../models/ciudades')(sequelize, DataTypes);
// const Province = require('../models/provincias')(sequelize, DataTypes);
// const Country = require('../models/paises')(sequelize, DataTypes);


// Se asigna la clave foránea a Person
Address.hasOne( Person, { foreignKey: 'direcciones_id_direccion' } );
Person.belongsTo( Address, { foreignKey: 'direcciones_id_direccion' } );


Person.hasMany( Contact, { foreignKey: 'personas_id_persona'} );
Contact.belongsTo( Person );

const evaluatorPersonController = { };


// Dar de alta un evaluador
evaluatorPersonController.createEvaluator = async ( req, res ) => {
    try {
        // Se crea la dirección primero para que se genere el id_dirección y luego poder asignarlo al evaluador
        const newAddress = await Address.create({
            ciudades_id_ciudad: req.body.id_city,
            codigo_postal: req.body.postal_code,
            calle: req.body.street,
            numero: req.body.street_number,
            departamento: req.body.departament,
            piso: req.body.floor
        });

        const newEvaluator = await Person.create({
            nombre: req.body.name,
            apellido: req.body.surname,
            fecha_nacimiento: req.body.date_of_birth,
            sexo: req.body.gender,
            documento: req.body.dni,
            tipo_persona: req.body.kind_of_person,
            // activo: 1, // Poner en el caso de hacer una baja lógica
            direcciones_id_direccion: newAddress.id_direccion // Lo trae de la dirección previamente creado
        });

        const newContact = await Contact.create({
            tipoContacto: req.body.contact_type,
            valor: req.body.value,
            personas_id_persona: newEvaluator.id_persona, // Lo trae del evaluadores previamente creado
            descripcion: req.body.contact_description
        });

        res.status(200).json( newEvaluator );
    } catch ( error ) {
        res.status(400).json( error );
    };
};





// Devuelve todos los evaluadores
evaluatorPersonController.getAllEvaluators = async ( req, res ) => {
    try {
        const evaluators = await Person.findAll({
            include: {
                model: Address,
                attributes: ['codigo_postal','calle','numero','departamento','piso']
            },
            attributes: ['id_persona','documento','nombre','apellido'],
            where: {
                tipo_persona: 'evaluador'
                // activo: 1 // Poner en el caso de hacer baja lógica
            }
        });
        res.status(200).json( evaluators );
    } catch ( error ) {
        // res.status(400).json( 'No hay evaluadores' );
        console.log(error);
    };
};






module.exports = evaluatorPersonController;


