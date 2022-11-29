const sequelize = require('../database/db-connection');
const models = require('../models');


const getSparePartByCode = async (sparePartCode) => {
    return await models.SparePart.findOne({
        where: {
            sparePartCode
        }
    });
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


module.exports = {
    getSparePartByCode,
    createSparePart
};