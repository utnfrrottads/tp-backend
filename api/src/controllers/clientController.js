const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const clientService = require('../services/clientService');


const newClient = async (req, res, next) => {
    const clientDni = req.body.dni;
    
    try {
        const client = await clientService.getClientByDni(clientDni);

        if (client) {
            throw ApiError.badRequest(`The client with dni '${clientDni}' already exists.`);
        }

        const newClient = await clientService.createClient(req.body);

        const response = responseCreator(newClient);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const deleteClient = async (req, res, next) => {
    const clientId = req.params.clientId;

    try {
        const clientToDelete = await clientService.getClientByPk(clientId);

        if (!clientToDelete) {
            throw ApiError.notFound(`Client with id '${clientId}' does not exist.`);
        }

        await clientService.deleteClient(clientId);

        const response = responseCreator(clientToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const editClient = async (req, res, next) => {
    const clientId = req.params.clientId;

    try {
        const clientToUpdate = await clientService.getClientByPk(clientId);

        if (!clientToUpdate) {
            throw ApiError.notFound(`Client with id '${clientId}' does not exist.`);
        }

        if (clientToUpdate.dni !== req.body.dni) {
            throw ApiError.badRequest("You cannot change the client's DNI.");
        }

        await clientService.editClient(req.body, clientId);

        const response = responseCreator(clientToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getClients = async (req, res, next) => {    
    try {
        const clients = await clientService.getClients(req.query);

        const response = responseCreator(clients);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getClientById = async (req, res, next) => {
    const clientId = req.params.clientId;
    
    try {
        const client = await clientService.getClientByPk(clientId);

        if (!client) {
            throw ApiError.notFound(`Client with id '${clientId}' does not exist.`);
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