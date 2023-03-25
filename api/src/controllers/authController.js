const ApiError = require('../utils/apiError');
const responseCreator = require('../utils/responseCreator');
const authService = require('../services/authService');
const { generateToken } = require('../utils/authUtil');


const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await authService.getUserByUsername(username);

        if (!user || user.password !== password) {
            throw ApiError.unauthorized(`Invalid username or password.`);
        }

        delete user.dataValues.password;
        const sessionToken = generateToken(user);

        const response = responseCreator({ user, sessionToken });

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    login
};