const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const customerService = require('../services/customerService');


const newCustomer = async (req, res, next) => {
    const customerDni = req.body.dni;
    
    try {
        const customer = await customerService.getCustomerByDni(customerDni);

        if (customer) {
            throw ApiError.badRequest(`The customer with dni '${customerDni}' already exists.`);
        }

        const newCustomer = await customerService.createCustomer(req.body);

        const response = responseCreator(newCustomer);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const deleteCustomer = async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        const customerToDelete = await customerService.getCustomerById(customerId);

        if (!customerToDelete) {
            throw ApiError.notFound(`Customer with id '${customerId}' does not exist.`);
        }

        await customerService.deleteCustomer(customerId);

        const response = responseCreator(customerToDelete);

        return res.status(200).json(response); 
    } catch (error) {
        next(error);
    }
};


const editCustomer = async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        const customerToUpdate = await customerService.getCustomerById(customerId);

        if (!customerToUpdate) {
            throw ApiError.notFound(`Customer with id '${customerId}' does not exist.`);
        }

        if (customerToUpdate.dni !== req.body.dni) {
            throw ApiError.badRequest("You cannot change the customer's DNI.");
        }

        await customerService.editCustomer(req.body, customerId);

        const response = responseCreator(customerToUpdate);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getCustomers = async (req, res, next) => {    
    try {
        const customers = await customerService.getCustomers(req.query);

        const response = responseCreator(customers);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


const getCustomerById = async (req, res, next) => {
    const customerId = req.params.customerId;
    const includeVehicles = req.query.includeVehicles;
    
    try {
        const customer = await customerService.getCustomerById(customerId, includeVehicles);

        if (!customer) {
            throw ApiError.notFound(`Customer with id '${customerId}' does not exist.`);
        }

        const response = responseCreator(customer);

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    newCustomer,
    deleteCustomer,
    editCustomer,
    getCustomers,
    getCustomerById
};