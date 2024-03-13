const models = require('../models');


const getUserById = async (userId) => {
    return await models.User.findByPk(userId, {
        include: [
            {
                model: models.Role
            }
        ]
    });
};


const getUserByUsername = async (username) => {
    return await models.User.findOne({
        include: [
            {
                model: models.Role
            }
        ],
        where: { username }
    });
};


module.exports = {
    getUserById,
    getUserByUsername
};