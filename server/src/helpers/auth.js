const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../../config');

const createJwtToken = (usuario) => {
    return jwt.sign({ _id: usuario._id }, TOKEN_SECRET);
}

module.exports = { createJwtToken }
