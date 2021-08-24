const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);


getCandidatos = async () => {
    try {
        const candidates = await models.personas.findAll({
            include:[
                { model: models.direcciones },
                { model: models.contactos },
                { model: models.experiencias }
            ],
            where: {
                tipo_persona: 'candidato'
            }
        });    

        return candidates;

    } catch ( error ) {
        throw error;
    }
};


module.exports = {
    getCandidatos
};
