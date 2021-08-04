const validator = require('validator');
const asyncForEach = require('../sharedFunctions/asyncForEach');

const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Vacant = require('../models/vacantes')(sequelize, DataTypes);
const Company = require('../models/empresas')(sequelize, DataTypes);
const Requirement = require('../models/requerimientos')(sequelize, DataTypes);


// Asigna la clave foránea id_vacante a la tabla Requirement
Vacant.hasMany( Requirement, { foreingKey: 'id_vacante' } );
Requirement.belongsTo( Vacant, { foreingKey: 'id_vacante' } );

// Asigna la clave foránea id_empresa a la tabla Vacant
Company.hasMany( Vacant, { foreingKey: 'id_empresa' } );
Vacant.belongsTo( Company, { foreingKey: 'id_empresa' } );


const vacantController = { };


// Dar de alta una vacante
vacantController.createVacant = async ( req, res ) => {
    const transaction = await sequelize.transaction();
    try {

        if( req.body.work_position === null || validator.isEmpty(req.body.work_position) ) {
            throw new Error('work_position field can\'t be empty');
        }

        if ( req.body.status !== 'pendiente de evaluador' &&
             req.body.status !== 'evaluador asignado' &&
             req.body.status !== 'cerrada' ) {
            throw new Error('The status value is wrong. Please, check status field');
        }

        if( req.body.id_company === null ) {
            throw new Error('id_company field can\'t be null');
        }

        const newVacant = await Vacant.create({
            cargo: req.body.work_position,
            descripcion: req.body.vacant_description,
            estado: req.body.status,
            id_empresa: req.body.id_company
        }, { transaction: transaction } );


        await asyncForEach( req.body.requirements , async (requirement) => {

            if( requirement.requirement_description === null || 
                validator.isEmpty(requirement.requirement_description) ) {
                throw new Error('requirement_description can\'t be empty');
            }

            await Requirement.create({
                id_vacante: newVacant.id_vacante,
                descripcion: requirement.requirement_description
            }, { transaction: transaction } );

        });


        await transaction.commit();
        res.status(200).json('Vacant created successfully');

    } catch ( error ) {
        await transaction.rollback();
        res.status(400).json( error.message );
    }
}


module.exports = vacantController;