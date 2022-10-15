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


const deleteMechanic = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const mechanicId = req.params.mechanicId;

    try {
        const mechanicToDelete = await models.Mechanic.findByPk(mechanicId);

        if (!mechanicToDelete) {
            throw ApiError.notFound(`Mechanic with id '${mechanicId}' does not exist.`);
        }

        await models.Mechanic.destroy({
            where: {
                mechanicId
            },
            transaction
        });

        await transaction.commit();

        const response = responseCreator(mechanicToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


const editMechanic = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const mechanicId = req.params.mechanicId;

    try {
        const mechanicToUpdate = await models.Mechanic.findByPk(mechanicId);

        if (!mechanicToUpdate) {
            throw ApiError.notFound(`Mechanic with id '${mechanicId}' does not exist.`);
        }

        if (mechanicToUpdate.registrationNumber !== req.body.registrationNumber) {
            throw ApiError.badRequest("You cannot change the mechanic's registration number.");
        }

        await models.Mechanic.update(req.body, {
            where: {
                mechanicId
            },
            transaction
        });

        await transaction.commit();

        const response = responseCreator(mechanicToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


const getMechanics = async (req, res, next) => {    
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const mechanics = await models.Mechanic.findAll({
            limit: limit,
            offset: offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });

        const response = responseCreator(mechanics);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newMechanic,
    deleteMechanic,
    editMechanic,
    getMechanics
};