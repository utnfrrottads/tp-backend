const sequelize = require('../database/db-connection');
const models = require('../models');
const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');


const newMechanic = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const mechanicRegistrationNumber = req.body.registrationNumber;

    try {
        const mechanic = await models.Mechanic.findOne({
            where: {
                registrationNumber: mechanicRegistrationNumber
            }
        });

        if (mechanic) {
            throw ApiError.badRequest(`The mechanic with registration number '${mechanicRegistrationNumber}' already exists.`);
        }

        const newMechanic = await models.Mechanic.create(req.body, { transaction });

        await transaction.commit();

        const response = responseCreator(newMechanic);

        return res.status(200).json(response);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


module.exports = {
    newMechanic
};