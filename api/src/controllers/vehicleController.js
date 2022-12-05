const ApiError = require("../utils/apiError");
const responseCreator = require("../utils/responseCreator");
const customerService = require("../services/customerService");
const vehicleService = require("../services/vehicleService");


const newVehicle = async (req, res, next) => {
    const licensePlate = req.body.licensePlate;
    const customerId = req.body.customerId;

    try {
        const vehicle = await vehicleService.getVehicleByLicensePlate(licensePlate);

        if (vehicle) {
            throw ApiError.badRequest(`A vehicle with license plate '${licensePlate}' already exists.`);
        }

        const customer = await customerService.getCustomerById(customerId);

        if (!customer) {
            throw ApiError.notFound(`Customer with id '${customerId}' does not exist.`);
        }

        const newVehicle = await vehicleService.createVehicle(req.body);

        const response = responseCreator(newVehicle);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newVehicle
};