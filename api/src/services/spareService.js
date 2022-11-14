const sequelize = require('../database/db-connection');
const models = require('../models');


const getSparePartByCode = async (spareCode) => {
    return await models.Spare.findOne({
        where: {
            spareCode: spareCode
        }
    });
};


const createSparePart = async (data) => {
    const transaction = await sequelize.transaction();

    try {
        const newSparePart = await models.Spare.create(data, { transaction });
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