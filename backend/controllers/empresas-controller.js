const { Op } = require("sequelize");
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { NotFoundError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

createEmpresa = async (data) => {
    checkMissingAttributes(
        { data: data, attrs: ['cuit', 'razon_social'] },
        { list: data.contactos, attrs: ['valor', 'tipoContacto'], prefix: 'contactos[]' }
    );
    const transaction = await sequelize.transaction();
    try {
        let empresa = await models.empresas.create(data, { 
            include: [{ model: models.contactos }],
            transaction: transaction,
        });
        await transaction.commit();
        return empresa;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

updateEmpresa = async (id, data) => {
    const transaction = await sequelize.transaction();
    try {
        let empresa = await models.empresas.update(data, {
            where: { id_empresa: id },
            include: [{ model: models.contactos }],
            transaction: transaction,
        });
        transaction.commit();
        return empresa;
    } catch (error) {
        transaction.rollback();
        throw error;
    }
};

deleteEmpresa = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        let result = await models.empresas.destroy({
            where: { id_empresa: id },
            transaction: transaction,
        });
        if (result <= 0) throw new NotFoundError(id, 'empresa');
        transaction.commit();
    } catch (error) {
        transaction.rollback();
        throw error;
    }
};

getEmpresas = async (filtros) => {
    const where = {};
    if (filtros.razon_social) where.razon_social = { [Op.like]: '%' + filtros.razon_social + '%' };
    return await models.empresas.findAll({
        include: [
            {
                model: models.contactos,
                attributes: ['id_contacto', 'tipoContacto', 'valor', 'descripcion'],
            },
        ],
        where: where,
    });
};

getEmpresa = async (id) => {
    let empresa = await models.empresas.findByPk(id, { include: [{ model: models.contactos }] });
    if (empresa === null) {
        throw new NotFoundError(id, 'empresa');
    }
    return empresa;
};

module.exports = {
    getEmpresa,
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
};
