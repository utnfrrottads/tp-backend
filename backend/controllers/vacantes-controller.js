const asyncForEach = require('../utils/async-for-each');
const sequelize = require('../database/db-connection');
const { Op } = require("sequelize");
const initModels = require('../models/init-models');
const { NotFoundError, InvalidAttributeError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

validateVacant = (body, action) => {
    checkMissingAttributes(
        { data: body, attrs: ['cargo', 'id_empresa'] },
        { list: body.requerimientos, attrs: ['descripcion'], prefix: 'requerimientos[]' },
    );
    if ( action === "update" ) {
        if ( body.hasOwnProperty("estado") ) {
            if ( !['pendiente de evaluador', 'evaluador asignado', 'cerrada'].includes( body.estado ) ) {
                throw new InvalidAttributeError(`\'${body.estado}\' no es un estado de vacante correcto.`, 'estado');
            }
        } else {
            throw new InvalidAttributeError(`Falta el atributo \'estado\'`, 'estado');
        };
    };
};

createVacant = async (body) => {

    validateVacant(body, "create");

    const transaction = await sequelize.transaction();
    try {
        const newVacant = await models.vacantes.create(body, { transaction: transaction });

        if ( body.requerimientos.length > 0 ) {
            await asyncForEach(body.requerimientos , async (requirement) => {
                await models.requerimientos.create({
                    id_vacante: newVacant.id_vacante,
                    descripcion: requirement.descripcion
                }, { transaction: transaction });
            });
        };

        await transaction.commit();
        return newVacant;
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

updateVacant = async (id_vacante, body) => {

    validateVacant(body, "update");

    const transaction = await sequelize.transaction();
    try {
        const vacantToUpdate = await models.vacantes.findByPk(id_vacante);

        if (!vacantToUpdate) {
            throw new NotFoundError(id_vacante, 'vacante');
        }

        await models.vacantes.update(body, {
            where: { id_vacante: id_vacante }, 
            transaction: transaction
        });

        await models.requerimientos.destroy({
            where: { id_vacante: id_vacante },
            transaction: transaction,
        });

        if ( body.requerimientos.length > 0 ) {
            await asyncForEach(body.requerimientos , async (requirement) => {
                await models.requerimientos.create({
                    id_vacante: id_vacante,
                    descripcion: requirement.descripcion
                }, { transaction: transaction });
            });
        };

        await transaction.commit();
        return vacantToUpdate;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

deleteVacant = async (id_vacante) => {
    const transaction = await sequelize.transaction();
    try {
        const result = await models.vacantes.destroy({
            where: { id_vacante: id_vacante },
            transaction: transaction
        });

        if (result <= 0) {
            throw new NotFoundError(id_vacante, 'vacante');
        }

        await transaction.commit();
        
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};

getOneVacant = async (id_vacante) => {
    const vacant = await models.vacantes.findOne({
        include: [
            models.empresas,
            models.requerimientos
        ],
        where: {
            id_vacante: id_vacante
        }
    });

    if (!vacant) {
        throw new NotFoundError(id_vacante, 'vacante');
    }

    return vacant;
};

getAllVacants = async (filtros) => {
    const where = {};
    if ( filtros.companyName ) where.razon_social = { [Op.like]: '%' + filtros.companyName + '%' };
    return await models.vacantes.findAll({
        include: [
            { 
                model: models.empresas,
                where: where
            },
            models.requerimientos,
        ]
    });
};

module.exports = {
    createVacant,
    updateVacant,
    deleteVacant,
    getOneVacant,
    getAllVacants,
};
