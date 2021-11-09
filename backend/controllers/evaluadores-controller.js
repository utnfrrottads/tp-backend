const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);

getEvaluadores = async () => {
    return await models.personas.findAll({
        include:[
            { model: models.direcciones },
            { model: models.contactos }
        ],
        where: {
            tipo_persona: 'evaluador'
        }
    });
}

module.exports = {
    getEvaluadores
};
