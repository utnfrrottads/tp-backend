const asyncForEach = require('../utils/async-for-each');
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { NotFoundError, InvalidAttributeError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

validateVacant = (body) => {
    checkMissingAttributes(
        { data: body, attrs: ['work_position', 'id_company', 'status'] },
        { list: body.requirements, attrs: ['requirement_description'], prefix: 'requirements[]' },
    );
    if (!['pendiente de evaluador', 'evaluador asignado', 'cerrada'].includes(body.status)) {
        throw new InvalidAttributeError(`\'${body.status}\' no es un estado de vacante correcto.`, 'status');
    }
}

createVacant = async (body) => {

    validateVacant(body);

    const transaction = await sequelize.transaction();
    try {
        const newVacant = await models.vacantes.create({
            cargo: body.work_position,
            descripcion: body.vacant_description,
            id_empresa: body.id_company
        }, { transaction: transaction });

        if ( body.requirements.length > 0 ) {
            await asyncForEach(body.requirements , async (requirement) => {
                await models.requerimientos.create({
                    id_vacante: newVacant.id_vacante,
                    descripcion: requirement.requirement_description
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

    validateVacant(body);

    const transaction = await sequelize.transaction();
    try {
        const vacantToUpdate = await models.vacantes.findByPk(id_vacante);

        if (!vacantToUpdate) {
            throw new NotFoundError(id_vacante, 'vacante');
        }

        await models.vacantes.update({
            cargo: body.work_position,
            descripcion: body.vacant_description,
            estado: body.status,
            id_empresa: body.id_company
        }, {
            where: { id_vacante: id_vacante }, 
            transaction: transaction
        });

        await models.requerimientos.destroy({
            where: { id_vacante: id_vacante },
            transaction: transaction,
        });

        await asyncForEach(body.requirements , async (requirement) => {
            await models.requerimientos.create({
                id_vacante: id_vacante,
                descripcion: requirement.requirement_description
            }, { transaction: transaction });
        });

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
    if (filtros.id_empresa) where.id_empresa = filtros.id_empresa;
    return await models.vacantes.findAll({
        include: [
            models.empresas,
            models.requerimientos,
        ],
        where: where,
    });
};

module.exports = {
    createVacant,
    updateVacant,
    deleteVacant,
    getOneVacant,
    getAllVacants,
};
