const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);


getEvaluadores = async () => {
    try {
        const evaluators = await models.personas.findAll({
            include:[
                { model: models.direcciones },
                { model: models.contactos }
            ],
            where: {
                tipo_persona: 'evaluador'
            }
        });    

        return evaluators;

    } catch ( error ) {
        throw error;
    }
}

module.exports = {
    getEvaluadores
};