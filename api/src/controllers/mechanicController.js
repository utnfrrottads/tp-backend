const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const mechanicService = require('../services/mechanicService');


const newMechanic = async (req, res, next) => {
    const mechanicRegistrationNumber = req.body.registrationNumber;

    try {
        const mechanic = await mechanicService.getMechanicByRegistrationNumber(mechanicRegistrationNumber);

        if (mechanic) {
            throw ApiError.badRequest(`The mechanic with registration number '${mechanicRegistrationNumber}' already exists.`);
        }

        const newMechanic = await mechanicService.createMechanic(req.body);

        const response = responseCreator(newMechanic);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const deleteMechanic = async (req, res, next) => {
    const mechanicId = req.params.mechanicId;

    try {
        const mechanicToDelete = await mechanicService.getMechanicByPk(mechanicId);

        if (!mechanicToDelete) {
            throw ApiError.notFound(`Mechanic with id '${mechanicId}' does not exist.`);
        }

        await mechanicService.deleteMechanic(mechanicId);

        const response = responseCreator(mechanicToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const editMechanic = async (req, res, next) => {
    const mechanicId = req.params.mechanicId;

    try {
        const mechanicToUpdate = await mechanicService.getMechanicByPk(mechanicId);

        if (!mechanicToUpdate) {
            throw ApiError.notFound(`Mechanic with id '${mechanicId}' does not exist.`);
        }

        if (mechanicToUpdate.registrationNumber !== req.body.registrationNumber) {
            throw ApiError.badRequest("You cannot change the mechanic's registration number.");
        }

        await mechanicService.editMechanic(req.body, mechanicId);

        const response = responseCreator(mechanicToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getMechanics = async (req, res, next) => {    
    try {
        const mechanics = await mechanicService.getMechanics(req.query);

        const response = responseCreator(mechanics);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getMechanicById = async (req, res, next) => {
    const mechanicId = req.params.mechanicId;
    
    try {
        const mechanic = await mechanicService.getMechanicByPk(mechanicId);

        if (!mechanic) {
            throw ApiError.notFound(`Mechanic with id '${mechanicId}' does not exist.`);
        }

        const response = responseCreator(mechanic);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newMechanic,
    deleteMechanic,
    editMechanic,
    getMechanics,
    getMechanicById
};