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


const updateStock = async (spareParts, transaction, addStock) => {
    let updateStockPromises = [];

    if (addStock) {
        spareParts.forEach(sparePart => {
            const numberOfSpareParts = sparePart.repair_spare.numberOfSpareParts;
            const statement = models.SparePart.increment({ stock: numberOfSpareParts }, { 
                where: { 
                    sparePartId: sparePart.repair_spare.sparePartId 
                }, transaction 
            });
            updateStockPromises.push(statement);
        });
    } else {
        spareParts.forEach(sparePart => {
            const numberOfSpareParts = sparePart.repair_spare.numberOfSpareParts;
            const statement = models.SparePart.decrement({ stock: numberOfSpareParts }, { 
                where: { 
                    sparePartId: sparePart.repair_spare.sparePartId 
                }, transaction 
            });
            updateStockPromises.push(statement);
        });
    }

    await Promise.all(updateStockPromises);
};


module.exports = {
    getSparePartByCode,
    getSparePartById,
    getSpareParts,
    createSparePart,
    deleteSparePart,
    editSparePart,
    updateStock
};