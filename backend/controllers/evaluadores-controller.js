const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);

const evaluatorPersonController = { };

evaluatorPersonController.getEvaluators = async ( req, res ) => {
    try {
        const evaluators = await models.personas.findAll({
            include:[
                { model: models.direcciones },
                { model: models.contactos}
            ],
            where: {
                tipo_persona: 'evaluador'
            }
        });    
    
        res.status(200).json(evaluators);

    } catch ( error ) {
        res.status(400).json( error.message );
    }
}

module.exports = evaluatorPersonController;