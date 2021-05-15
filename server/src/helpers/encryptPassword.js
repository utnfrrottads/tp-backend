const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const matchPassword = async (password, savedPassword) => {
    return await bcrypt.compare(password, savedPassword);
}

module.exports = { encryptPassword, matchPassword };
