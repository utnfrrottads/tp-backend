const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const repairService = require('../services/repairService');
const vehicleService = require('../services/vehicleService');
const mechanicService = require('../services/mechanicService');
const { 
    ENTERED_REPAIR, 
    IN_PROGRESS_REPAIR, 
    COMPLETED_REPAIR, 
    DELIVERED_REPAIR 
} = require('../utils/repairStatus');


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


const deleteRepair = async (req, res, next) => {
    const repairId = req.params.repairId;

    try {
        const repairToDelete = await repairService.getRepairById(repairId);

        if (!repairToDelete) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repairToDelete.status !== DELIVERED_REPAIR) {
            throw ApiError.badRequest(`The repair with id '${repairId}' cannot be deleted because it has a status other than '${DELIVERED_REPAIR}'.`);
        }

        await repairService.deleteRepair(repairId);

        const response = responseCreator(repairToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const editRepair = async (req, res, next) => {
    const repairId = req.params.repairId;

    try {
        const repair = await repairService.getRepairById(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repair.status === ENTERED_REPAIR) {
            await repairService.editEnteredRepair(req.body, repairId);
        } else if (repair.status === IN_PROGRESS_REPAIR) {
            const mechanicId = req.body.mechanicId;

            if (repair.mechanicId !== mechanicId) {
                throw ApiError.badRequest("You cannot edit this repair because it is assigned to another mechanic.");
            }

            await repairService.editInProgressRepair(req.body, repairId);
        } else {
            throw ApiError.badRequest(`You cannot edit this repair because it has a status other than '${ENTERED_REPAIR}' or '${IN_PROGRESS_REPAIR}'.`);
        }

        const response = responseCreator(repair);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const assignMechanicToRepair = async (req, res, next) => {
    const repairId = req.params.repairId;
    const mechanicId = req.params.mechanicId;

    try {
        const repair = await repairService.getRepairById(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repair.mechanicId) {
            throw ApiError.badRequest('A mechanic is already assigned to this repair.');
        }

        if (repair.status !== ENTERED_REPAIR) {
            throw ApiError.badRequest(`You cannot perform this operation because it has a status other than '${ENTERED_REPAIR}'.`);
        }

        const mechanic = await mechanicService.getMechanicById(mechanicId);

        if (!mechanic) {
            throw ApiError.notFound(`The mechanic with id '${mechanicId}' does not exist.`);
        }

        const data = { status: IN_PROGRESS_REPAIR, mechanicId };
        await repairService.changeRepairStatusAndDate(data, repair);

        const response = responseCreator(repair);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const markRepairAsCompleted = async (req, res, next) => {
    const repairId = req.params.repairId;
    const mechanicId = req.params.mechanicId;

    try {
        const repair = await repairService.getRepairById(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repair.mechanicId != mechanicId) {
            throw ApiError.badRequest("You cannot perform this operation because it is assigned to another mechanic.");
        }

        if (repair.status !== IN_PROGRESS_REPAIR) {
            throw ApiError.badRequest(`You cannot perform this operation because it has a status other than '${IN_PROGRESS_REPAIR}'.`);
        }

        await repairService.changeRepairStatusAndDate({ status: COMPLETED_REPAIR }, repair);

        const response = responseCreator(repair);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const markRepairAsDelivered = async (req, res, next) => {
    const repairId = req.params.repairId;

    try {
        const repair = await repairService.getRepairById(repairId);

        if (!repair) {
            throw ApiError.notFound(`The repair with id '${repairId}' does not exist.`);
        }

        if (repair.status !== COMPLETED_REPAIR) {
            throw ApiError.badRequest(`You cannot perform this operation because it has a status other than '${COMPLETED_REPAIR}'.`);
        }

        await repairService.changeRepairStatusAndDate({ status: DELIVERED_REPAIR }, repair);

        const response = responseCreator(repair);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const getRepairs = async (req, res, next) => {
    try {
        const repairs = await repairService.getRepairs(req.query);

        const response = responseCreator(repairs);

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
    deleteRepair,
    editRepair,
    assignMechanicToRepair,
    markRepairAsCompleted,
    markRepairAsDelivered,
    getRepairs,
    getRepairById
};