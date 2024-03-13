const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const sparePartService = require('../services/sparePartService');


const newSparePart = async (req, res, next) => {
    const sparePartCode = req.body.sparePartCode;

    try {
        const sparePart = await sparePartService.getSparePartByCode(sparePartCode);

        if (sparePart) {
            throw ApiError.badRequest(`The spare part with the code '${sparePartCode}' already exists.`);
        }

        const newSparePart = await sparePartService.createSparePart(req.body);

        const response = responseCreator(newSparePart);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const deleteSparePart = async (req, res, next) => {
    const sparePartId = req.params.sparePartId;

    try {
        const sparePartToDelete = await sparePartService.getSparePartById(sparePartId);

        if (!sparePartToDelete) {
            throw ApiError.notFound(`The spare part with id '${sparePartId}' does not exist.`);
        }

        await sparePartService.deleteSparePart(sparePartId);

        const response = responseCreator(sparePartToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const editSparePart = async (req, res, next) => {
    const sparePartId = req.params.sparePartId;

    try {
        const sparePartToUpdate = await sparePartService.getSparePartById(sparePartId);

        if (!sparePartToUpdate) {
            throw ApiError.notFound(`The spare part with id '${sparePartId}' does not exist.`);
        }

        if (sparePartToUpdate.sparePartCode !== req.body.sparePartCode) {
            throw ApiError.badRequest("You cannot change the spare part code.");
        }

        await sparePartService.editSparePart(req.body, sparePartId);

        const response = responseCreator(sparePartToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getSpareParts = async (req, res, next) => {    
    try {
        const spareParts = await sparePartService.getSpareParts(req.query);

        const response = responseCreator(spareParts);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getSparePartById = async (req, res, next) => {
    const sparePartId = req.params.sparePartId;
    
    try {
        const sparePart = await sparePartService.getSparePartById(sparePartId);

        if (!sparePart) {
            throw ApiError.notFound(`The spare part with id '${sparePartId}' does not exist.`);
        }

        const response = responseCreator(sparePart);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newSparePart,
    deleteSparePart,
    editSparePart,
    getSpareParts,
    getSparePartById
};