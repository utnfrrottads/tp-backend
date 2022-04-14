const { Op } = require("sequelize");
const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { NotFoundError, InvalidAttributeError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const checkContactTypeAndValue = require('../utils/check-contact-type-and-value');
const models = initModels(sequelize);

createEmpresa = async (data) => {
    checkMissingAttributes(
        { data: data, attrs: ['cuit', 'razon_social'] },
        { list: data.contactos, attrs: ['valor', 'tipoContacto'], prefix: 'contactos[]' }
    );
    const transaction = await sequelize.transaction();
    try {
        const empresa = await models.empresas.create(data, { transaction: transaction });
        await addContact(data.contactos, empresa.id_empresa, transaction);
        await transaction.commit();
        return empresa;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

updateEmpresa = async (id, data) => {
    checkMissingAttributes(
        { data: data, attrs: ['cuit', 'razon_social'] },
        { list: data.contactos, attrs: ['valor', 'tipoContacto'], prefix: 'contactos[]' }
    );
    const transaction = await sequelize.transaction();
    try {
        const empresa = await models.empresas.update(data, {
            where: { id_empresa: id },
            transaction: transaction
        });
        if (empresa === null) {
            throw new NotFoundError(id, 'empresa');
        }
        await models.contactos.destroy({ 
            where: { empresas_id_empresa: id },
            transaction: transaction
        });
        await addContact(data.contactos, id, transaction);
        await transaction.commit();
        return empresa;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

deleteEmpresa = async (id) => {
    const transaction = await sequelize.transaction();
    try {
        const result = await models.empresas.destroy({
            where: { id_empresa: id },
            transaction: transaction,
        });
        if (result <= 0) throw new NotFoundError(id, 'empresa');
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
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
    const empresa = await models.empresas.findByPk(id, { include: [{ model: models.contactos }] });
    if (empresa === null) {
        throw new NotFoundError(id, 'empresa');
    }
    return empresa;
};

/**
 * Crea los contactos de una empresa cuando esta última es modificada.
*/
const addContact = async (contactos, id_empresa, transaction) => {
    if ( checkContactTypeAndValue(contactos) ) {
        await models.contactos.bulkCreate(contactos.map(contacto => {
            return {
                tipoContacto: contacto.tipoContacto,
                valor: contacto.valor,
                empresas_id_empresa: id_empresa,
                descripcion: contacto.descripcion
            }
        }), { transaction: transaction });
    } else {
        throw new InvalidAttributeError('Check that the \'valor\' field corresponds to the \'tipoContacto\' field defined within the company contact', ['tipoContacto', 'valor']);
    };
};

module.exports = {
    getEmpresa,
    getEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
};