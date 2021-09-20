const validator = require('validator');
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


// Dar de alta una evaluación.
createEvaluacion = async ( body ) => {
    const transaction = await sequelize.transaction();
    try {

        if( body.evaluation_description === null || validator.isEmpty(body.evaluation_description) ) {
            throw new Error('evaluation_description field can\'t be empty');
        };

        await models.evaluaciones.create({
            descripcion: body.evaluation_description
        }, { transaction: transaction });
        
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Actualizar los datos de una evaluación.
updateEvaluacion = async (id_evaluacion, body) => {
    const transaction = await sequelize.transaction();
    try {

        if( !id_evaluacion ) { // Si no existe el parámetro
            throw new Error('Param is missing');
        };

        if( body.evaluation_description === null || validator.isEmpty(body.evaluation_description) ) {
            throw new Error('evaluation_description field can\'t be empty');
        };

        const evaluationToUpdate = await models.evaluaciones.findByPk( id_evaluacion );

        if( !evaluationToUpdate ) {
            throw new Error(`Evaluation with ID ${id_evaluacion} not found`);
        };

        await models.evaluaciones.update({
            descripcion: body.evaluation_description
        }, 
        {
            where: {
                id_evaluacion: id_evaluacion
            }, 
            transaction: transaction } );
        
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Eliminar una evaluación.
deleteEvaluacion = async (id_evaluacion) => {
    const transaction = await sequelize.transaction();
    try {

        if( !id_evaluacion ) { // Si no existe el parámetro
            throw new Error('Param is missing');
        };

        const evaluationDeleted = await models.evaluaciones.destroy({
            where: {
                id_evaluacion: id_evaluacion
            }, transaction: transaction } );
        
        if( evaluationDeleted === 0 ) { // Si la cláusula where falla y no se puede eliminar la evaluación
            throw new Error(`There is no an evaluation with ID ${id_evaluacion}`);
        }
        
        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Consultar una evaluación dado su ID.
getEvaluacion = async (id_evaluacion) => {
    try {

        if( !id_evaluacion ) { // Si no existe el parámetro
            throw new Error('Param is missing');
        };

        const evaluation = await models.evaluaciones.findByPk(id_evaluacion);

        if ( !evaluation ) {
            throw new Error(`There is no an evaluation with ID ${id_evaluacion}`);
        };
        
        return evaluation;
        
    } catch (error) {
        throw error;
    }
};

// Consultar todas las evaluaciones.
getEvaluaciones = async () => {
    try {
        const evaluations = await models.evaluaciones.findAll();
        
        if( evaluations.length === 0 ) {
            throw new Error('Evaluations not found');
        };

        return evaluations;

    } catch (error) {
        throw error;
    }
};


module.exports = {
    getEvaluacion,
    getEvaluaciones,
    createEvaluacion,
    updateEvaluacion,
    deleteEvaluacion
}