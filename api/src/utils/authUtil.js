const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');


const generateToken = (payload) => {
    return jwt.sign(
        {
            userId: payload.userId,
            roleId: payload.role.roleId,
            role: payload.role.roleDescription
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "1h"
        }
    );
};


const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_KEY, (error, decodedData) => {
        if (error) {
            throw ApiError.unauthorized('Invalid token.');
        }
        return decodedData;
    });
};


module.exports = {
    generateToken,
    verifyToken
};