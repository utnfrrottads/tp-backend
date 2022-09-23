const models = require('../models');
const sequelize = require('../database/db-connection');
const ApiError = require('../utils/apiError');


const newClient = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const client = await models.Client.findOne({
            where: {
                dni: req.body.dni
            }
        });

        if (client) {
            throw ApiError.badRequest(`The client with dni '${req.body.dni}' already exists.`);
        }

        const newClient = await models.Client.create(req.body, { transaction });

        await transaction.commit();

        return res.status(200).json({
            status: 200,
            errors: [],
            data: newClient
        });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


module.exports = {
    newClient
};