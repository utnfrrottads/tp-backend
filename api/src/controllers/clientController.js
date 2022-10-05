const models = require('../models');
const sequelize = require('../database/db-connection');
const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');


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

        const response = responseCreator(newClient);

        return res.status(200).json(response);
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

        const response = responseCreator(clientToDelete);

        return res.status(200).json(response); 
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

        const response = responseCreator(clientToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        await transaction.rollback();
        next(error);
    }
};


const getClients = async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {
        const clients = await models.Client.findAll({
            limit: limit,
            offset: offset,
            order: [['firstName', 'ASC'], ['lastName', 'ASC']]
        });

        const response = responseCreator(clients);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getClientById = async (req, res, next) => {
    const clientId = req.params.clientId;
    try {
        const client = await models.Client.findByPk(clientId);

        if (!client) {
            throw ApiError.notFound(`Client with id ${clientId} does not exist.`);
        }

        const response = responseCreator(client);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newClient,
    deleteClient,
    editClient,
    getClients,
    getClientById
};