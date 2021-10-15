const {Op} = require("sequelize");
const initModels = require('../models/init-models');
const sequelize = require('../database/db-connection');
const models = initModels(sequelize);


getCandidatos = async () => {
    try {
        const candidatos = await models.personas.findAll({
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

        return candidatos;

    } catch ( error ) {
        throw error;
    }
};

getCandidato = async (id_candidato) => {
    try {
        const candidato = await models.personas.findOne({
            include:[
                { model: models.contactos },
                { model: models.experiencias },
                { 
                    model: models.entrevistas, as: 'entrevistas_candidato',
                    include: {
                        model: models.evaluaciones
                    }
                }
            ],
            where: {
                [Op.and]: {
                    id_persona: id_candidato,
                    tipo_persona: 'candidato'
                }
            }
        });    

        return candidato;

    } catch ( error ) {
        throw error;
    }
};


module.exports = {
    getCandidatos,
    getCandidato
};
