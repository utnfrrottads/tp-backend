const sequelize = require('../database/db-connection');
const models = require('../models');
const { Op } = require('sequelize');


const getSparePartByCode = async (sparePartCode) => {
    return await models.SparePart.findOne({
        where: {
            sparePartCode
        }
    });
};


const getSparePartById = async (sparePartId) => {
    return await models.SparePart.findByPk(sparePartId);
};


const getSpareParts = async (queryParams) => {
    const limit = parseInt(queryParams.limit) || null;
    const offset = parseInt(queryParams.offset) || null;
    const query = queryParams.query;

    const {count: numberOfSpareParts, rows: spareParts} = await models.SparePart.findAndCountAll({
        where: {
            sparePartDescription: {
                [Op.substring]: query
            }
        },
        limit,
        offset,
        order: [['sparePartDescription', 'ASC']]
    });

    return {total: numberOfSpareParts, records: spareParts};
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
    getSparePartById,
    getSpareParts,
    createSparePart,
    deleteSparePart,
    editSparePart
};