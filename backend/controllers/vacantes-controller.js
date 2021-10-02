const validator = require('validator');
const asyncForEach = require('../utils/async-for-each');

const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


// Dar de alta una vacante
createVacant = async ( body ) => {
    const transaction = await sequelize.transaction();
    try {
        if( body.work_position === null || validator.isEmpty(body.work_position) ) {
            throw new Error('work_position field can\'t be empty');
        }

        if ( body.status !== 'pendiente de evaluador' &&
             body.status !== 'evaluador asignado' &&
             body.status !== 'cerrada' ) {
            throw new Error('The status value is wrong. Please, check status field');
        }

        if( body.id_company === null ) {
            throw new Error('id_company field can\'t be null');
        }

        const newVacant = await models.vacantes.create({
            cargo: body.work_position,
            descripcion: body.vacant_description,
            estado: body.status,
            id_empresa: body.id_company
        }, { transaction: transaction } );

        await asyncForEach( body.requirements , async (requirement) => {
            if( requirement.requirement_description === null || 
                validator.isEmpty(requirement.requirement_description) ) {
                throw new Error('requirement_description can\'t be empty');
            }

            await models.requerimientos.create({
                id_vacante: newVacant.id_vacante,
                descripcion: requirement.requirement_description
            }, { transaction: transaction } );
        });

        await transaction.commit();
        
    } catch ( error ) {
        await transaction.rollback();
        throw error;
    };
};


// Actualizar los datos de una vacante
updateVacant = async ( id_vacante, body ) => {
    const transaction = await sequelize.transaction();
    try {
        if( !id_vacante ) { // Si no existe el parámetro
            throw new Error('Param is missing');
        }

        if( body.work_position === null || validator.isEmpty(body.work_position) ) {
            throw new Error('work_position field can\'t be empty');
        }

        if ( body.status !== 'pendiente de evaluador' &&
             body.status !== 'evaluador asignado' &&
             body.status !== 'cerrada' ) {
            throw new Error('The status value is wrong. Please, check status field');
        }

        if( body.id_company === null ) {
            throw new Error('id_company field can\'t be null');
        }

        const vacantToUpdate = await models.vacantes.findByPk( id_vacante );

        if( !vacantToUpdate ) {
            throw new Error(`Vacant with ID ${id_vacante} not found`);
        }

        await models.vacantes.update({
            cargo: body.work_position,
            descripcion: body.vacant_description,
            estado: body.status,
            id_empresa: body.id_company
        },
        {
            where: {
                id_vacante: id_vacante
            }, 
            transaction: transaction } );

        await models.requerimientos.destroy({
            where: {
                id_vacante: id_vacante
            }, transaction: transaction } );

        await asyncForEach( body.requirements , async (requirement) => {
            if( requirement.requirement_description === null || 
                validator.isEmpty(requirement.requirement_description) ) {
                throw new Error('requirement_description can\'t be empty');
            }

            await models.requerimientos.create({
                id_vacante: id_vacante,
                descripcion: requirement.requirement_description
            }, { transaction: transaction } );
        });

        await transaction.commit();
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


// Eliminar una vacante
deleteVacant = async ( id_vacante ) => {
    const transaction = await sequelize.transaction();
    try {
        if( !id_vacante ){ // Si el parámetro no existe
            throw new Error('Param is missing');
        }

        const vacantDeleted = await models.vacantes.destroy({
            where: {
                id_vacante: id_vacante
            }, transaction: transaction } );

        if( vacantDeleted === 0 ) { // Si la cláusula where falla y no se puede eliminar la vacante
            throw new Error(`There is no a vacant with ID ${id_vacante}`);
        }

        await transaction.commit();
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};


// Consultar una vacante dado su ID
getOneVacant = async ( id_vacante ) => {
    try {
        if( !id_vacante ) {
            throw new Error('Param is missing');
        }

        const vacant = await models.vacantes.findOne({
            include: [
                models.empresas,
                models.requerimientos
            ],
            where: {
                id_vacante: id_vacante
            }
        });

        if( !vacant ){
            throw new Error(`There is no vacant with ID ${id_vacante}`);
        }

        return vacant;

    } catch (error) {
        throw error;
    }
};


// Consultar todas las vacantes para una empresa
getAllVacantsByCompany = async ( ) => {
    try {
        const vacants = await models.empresas.findAll({
            include: {
                model: models.vacantes,
                include: {
                    model: models.requerimientos
                }
            }
        });

        if ( vacants.length === 0 ) {
            throw new Error('Vacants not found');
        }

        return vacants;

    } catch (error) {
        throw error;
    }
};


module.exports = {
    createVacant,
    updateVacant,
    deleteVacant,
    getOneVacant,
    getAllVacantsByCompany
};