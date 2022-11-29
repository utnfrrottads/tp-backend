const sequelize = require('../database/db-connection');
const models = require('../models');


const getSparePartByCode = async (sparePartCode) => {
    return await models.SparePart.findOne({
        where: {
            sparePartCode
        }
    });
};


const getSparePartByPk = async (sparePartId) => {
    return await models.SparePart.findByPk(sparePartId);
};


const createSparePart = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newSparePart = await models.SparePart.create(data, { transaction });
        await transaction.commit();
        
        return newSparePart;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


const deleteSparePart = async (sparePartId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.SparePart.destroy({
            where: {
                sparePartId
            },
            transaction
        });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
    getSparePartByCode,
    getSparePartByPk,
    createSparePart,
    deleteSparePart
};