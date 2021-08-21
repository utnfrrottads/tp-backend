const sequelize = require('../database/db-connection');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


getEmpresa = async (id) => {
    let empresa = await models.empresas.findByPk(id);
    if (empresa === null) {
        throw new Error(`Empresa con id ${id} no encontrada.`);
    }
    return empresa;
}

getEmpresas = async () => {
    return await models.empresas.findAll();
}

postEmpresa = async (data) => {
    return await models.empresas.create(data);
}

putEmpresa = async (id, data) => {
    return await models.empresas.update(data, {where: {id_empresa: id}});
}

deleteEmpresa = async (id) => {
    await models.empresas.destroy({where: {id_empresa: id}});
}

module.exports = {
    getEmpresa,
    getEmpresas,
    postEmpresa,
    putEmpresa,
    deleteEmpresa
}
