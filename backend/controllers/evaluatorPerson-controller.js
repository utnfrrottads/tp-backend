const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Person = require('../models/personas')(sequelize, DataTypes);


const evaluatorPersonController = { };


// Dar de alta un evaluador
evaluatorPersonController.createEvaluator = async ( req, res ) => {
    try {
        const newEvaluator = await Person.create({
            nombre: req.body.name,
            apellido: req.body.surname,
            fecha_nacimiento: req.body.date_of_birth,
            sexo: req.body.gender,
            documento: req.body.dni,
            tipo_persona: req.body.kind_of_person,
            direcciones_id_direccion: req.body.id_address
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
            where: {
                tipo_persona: 'evaluador'
            }
        });
        res.status(200).json( evaluators );
    } catch ( error ) {
        res.status(400).json( 'No hay evaluadores' );
    };
};






module.exports = evaluatorPersonController;


