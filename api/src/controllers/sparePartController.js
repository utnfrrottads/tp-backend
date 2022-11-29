const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const sparePartService = require('../services/sparePartService');


const newSpare = async (req, res, next) => {
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


module.exports = {
    newSpare
};