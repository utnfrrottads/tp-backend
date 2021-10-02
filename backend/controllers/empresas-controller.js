const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const { NotFoundError } = require('../utils/api-error');
const checkMissingAttributes = require('../utils/check-missing-attrs');
const models = initModels(sequelize);

getEmpresas = async () => {
    return await models.empresas.findAll({
        include: [
            {
                model: models.contactos,
                attributes: ['id_contacto', 'tipoContacto', 'valor', 'descripcion'],
            },
        ],
    });
};

getEmpresa = async (id) => {
    let empresa = await models.empresas.findByPk(id, { include: [{ model: models.contactos }] });
    if (empresa === null) {
        throw new NotFoundError(id, 'empresa');
    }
    return empresa;
};

postEmpresa = async (data) => {
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

putEmpresa = async (id, data) => {
    return await models.empresas.update(data, {
        where: { id_empresa: id },
        include: [{ model: models.contactos }],
    });
};

deleteEmpresa = async (id) => {
    let result = await models.empresas.destroy({ where: { id_empresa: id } });
    if (result <= 0) {
        throw new NotFoundError(id, 'empresa');
    }
};

module.exports = {
    getEmpresa,
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
};
