const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const repairService = require('../services/repairService');
const vehicleService = require('../services/vehicleService');


const newRepair = async (req, res, next) => {
    const vehicleId = req.body.vehicleId;
    const customerId = req.body.customerId;

    try {
        const vehicle = await vehicleService.getVehicleById(vehicleId);

        if (!vehicle) {
            throw ApiError.notFound(`The vehicle with id '${vehicleId}' does not exist.`);
        }

        if (vehicle.customerId !== customerId) {
            throw ApiError.badRequest("The vehicle does not belong to the customer.");
        }

        const isRepairRelatedToAShift = await repairService.isRepairRelatedToAShift(customerId);

        if (!isRepairRelatedToAShift) {
            throw ApiError.badRequest("The repair is not related to any shift on stand by for this customer.");
        }

        const newRepair = await repairService.createRepair(req.body);

        await repairService.changeShiftStatusToEntered(customerId);

        const response = responseCreator(newRepair);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const editEnteredRepair = async (req, res, next) => {
    const repairId = req.params.repairId;

    try {
        const repair = await repairService.getRepairById(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repair.status !== 'Entered') {
            throw ApiError.badRequest("You cannot edit this repair because it has a status other than 'Entered'.");
        }

        await repairService.editEnteredRepair(req.body, repairId);

        const response = responseCreator(repair);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getRepairById = async (req, res, next) => {
    const repairId = req.params.repairId;

    try {
        const repair = await repairService.getRepairData(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        const response = responseCreator(repair);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newRepair,
    editEnteredRepair,
    getRepairById
};