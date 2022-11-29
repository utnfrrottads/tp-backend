const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require("sequelize");


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


const getSpareParts = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || 10;
    const offset = parseInt(queryParams.offset) || 0;
    const query = queryParams.query;

    let spareParts = [];

    if (query) {
        spareParts = await models.SparePart.findAll({
            where: {
                sparePartDescription: {
                    [Op.substring]: query
                }
            },
            limit,
            offset,
            order: [['sparePartDescription', 'ASC']]
        });
    } else {
        spareParts = await models.SparePart.findAll({
            limit,
            offset,
            order: [['sparePartDescription', 'ASC']]
        });
    }

    return spareParts;
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


const editSparePart = async (data, sparePartId) => {
    const transaction = await sequelize.transaction();

    try {
        await models.SparePart.update(data, {
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
    getSpareParts,
    createSparePart,
    deleteSparePart,
    editSparePart
};