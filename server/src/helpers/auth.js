const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const createJwtToken = (usuario) => {
    return jwt.sign({ _id: usuario._id }, process.env.TOKEN_SECRET);
}

module.exports = { createJwtToken }
