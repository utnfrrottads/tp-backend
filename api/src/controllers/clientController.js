const models = require('../models');
const sequelize = require('../database/db-connection');
const ApiError = require('../utils/apiError');


const newClient = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const clientDni = req.body.dni;
    try {
        const client = await models.Client.findOne({
            where: {
                dni: clientDni
            }
        });

        if (client) {
            throw ApiError.badRequest(`The client with dni '${clientDni}' already exists.`);
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


const deleteClient = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const clientId = req.params.clientId;
    try {
        const clientToDelete = await models.Client.findByPk(clientId);

        if (!clientToDelete) {
            throw ApiError.notFound(`Client with id ${clientId} does not exist.`);
        }

        await models.Client.destroy({
            where: {
                clientId
            },
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            status: 200,
            errors: [],
            data: clientToDelete
        }); 
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


const editClient = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    const clientId = req.params.clientId;
    try {
        const clientToUpdate = await models.Client.findByPk(clientId);

        if (!clientToUpdate) {
            throw ApiError.notFound(`Client with id ${clientId} does not exist.`);
        }

        await models.Client.update(req.body, {
            where: {
                clientId
            },
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            status: 200,
            errors: [],
            data: clientToUpdate
        });
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


module.exports = {
    newClient,
    deleteClient,
    editClient
};