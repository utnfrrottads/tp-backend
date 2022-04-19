const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { NotFoundError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

createEvaluacion = async (body) => {
    checkMissingAttributes(
        { data: body, attrs: ['descripcion'] },
    );
    const transaction = await sequelize.transaction();
    try {
        const newEvaluation = await models.evaluaciones.create(body, { transaction: transaction });
        await transaction.commit();
        return newEvaluation;
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

updateEvaluacion = async (id_evaluacion, body) => {
    checkMissingAttributes(
        { data: body, attrs: ['descripcion'] },
    );
    const transaction = await sequelize.transaction();
    try {
        const evaluationToUpdate = await models.evaluaciones.findByPk(id_evaluacion);

        if (!evaluationToUpdate) {
            throw new NotFoundError(id_evaluacion, 'evaluación')
        };

        await models.evaluaciones.update(body, {
            where: { id_evaluacion: id_evaluacion }, 
            transaction: transaction,
        });
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

deleteEvaluacion = async (id_evaluacion) => {
    const transaction = await sequelize.transaction();
    try {
        const result = await models.evaluaciones.destroy({
            where: { id_evaluacion: id_evaluacion }, 
            transaction: transaction
        });
        if (result <= 0) throw new NotFoundError(id_evaluacion, 'evaluación');
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

getEvaluacion = async (id_evaluacion) => {
    const evaluation = await models.evaluaciones.findByPk(id_evaluacion);
    if (evaluation === null) {
        throw new NotFoundError(id_evaluacion, 'evaluación');
    }
    return evaluation;
};

getEvaluaciones = async () => {
    return await models.evaluaciones.findAll();
};

module.exports = {
    getEvaluacion,
    getEvaluaciones,
    createEvaluacion,
    updateEvaluacion,
    deleteEvaluacion
};