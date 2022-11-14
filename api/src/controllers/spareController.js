const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const sparePartService = require('../services/spareService');


const newSpare = async (req, res, next) => {
    const spareCode = req.body.spareCode;

    try {
        const sparePart = await sparePartService.getSparePartByCode(spareCode);

        if (sparePart) {
            throw ApiError.badRequest(`The spare part with the code '${spareCode}' already exists.`);
        }

        const newSparePart = await sparePartService.createSparePart(req.body);

        const response = responseCreator(newSparePart);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newSpare
};