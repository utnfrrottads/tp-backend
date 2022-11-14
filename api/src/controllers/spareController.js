const models = require('../models');
const sequelize = require("../database/db-connection");
const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');


const newSpare = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const spareCode = req.body.spareCode;

    try {
        const spare = await models.Spare.findOne({
            where: {
                spareCode: spareCode
            }
        });

        if (spare) {
            throw ApiError.badRequest(`The spare part with the code '${spareCode}' already exists.`);
        }

        const newSpare = await models.Spare.create(req.body, { transaction });

        await transaction.commit();

        const response = responseCreator(newSpare);

        return res.status(200).json(response);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


module.exports = {
    newSpare
};