const { Op } = require("sequelize");
const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const { NotFoundError } = require("../utils/api-error");
const models = initModels(sequelize);


getCandidatos = async () => {
    return await models.personas.findAll({
        include:[
            { 
                model: models.direcciones,
                include: {
                    model: models.ciudades,
                    include: {
                        model: models.provincias,
                        include: {
                            model: models.paises
                        }
                    }
                }
            },
            { model: models.contactos },
            { model: models.experiencias }
        ],
        where: {
            tipo_persona: 'candidato'
        }
    });    
};

getCandidato = async (id_candidato) => {
    const candidate = await models.personas.findOne({
        include: [
            { model: models.contactos },
            { model: models.experiencias },
            { 
                model: models.entrevistas, as: 'entrevistas_candidato',
                include: { model: models.evaluaciones }
            }
        ],
        where: {
            [Op.and]: {
                id_persona: id_candidato,
                tipo_persona: 'candidato'
            }
        }
    });    

    if (candidate === null) {
        throw new NotFoundError(id_candidato, 'candidato');
    }

    return candidate;
};

module.exports = {
    getCandidatos,
    getCandidato
};