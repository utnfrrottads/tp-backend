const { verifyToken } = require("../utils/authUtil");
const ApiError = require('../utils/apiError');
const authService = require('../services/authService');


const checkAuth = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        
        if (typeof bearerHeader === 'undefined') {
            throw ApiError.unauthorized('You must be logged in before continuing.');
        }

        const bearerToken = bearerHeader.split(' ').pop();

        verifyToken(bearerToken);

        next();
    } catch (error) {
        next(error);
    }
};


const checkAuthRole = (roles) => async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization.split(' ').pop();
        const decodedData = verifyToken(bearerToken);

        const user = await authService.getUserById(decodedData.userId);

        if (!roles.includes(user.role.roleDescription)) {
            throw ApiError.forbidden('You do not have permission to access.');
        }
        
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = {
    checkAuth,
    checkAuthRole
};