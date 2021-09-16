const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


getEvaluacion = async (id) => {
    let evaluacion = await models.evaluaciones.findByPk(id);
    if (evaluacion === null) {
        throw new Error(`Evaluacion con id ${id} no encontrada.`);
    }
    return evaluacion;
}

getEvaluaciones = async () => {
    return await models.evaluaciones.findAll();
}

postEvaluacion = async (data) => {
    return await models.evaluaciones.create(data);
}

putEvaluacion = async (id, data) => {
    return await models.evaluaciones.update(data, {where: {id_evaluacion: id}});
}

deleteEvaluacion = async (id) => {
    await models.evaluaciones.destroy({where: {id_evaluacion: id}});
}

module.exports = {
    getEvaluacion,
    getEvaluaciones,
    postEvaluacion,
    putEvaluacion,
    deleteEvaluacion
}