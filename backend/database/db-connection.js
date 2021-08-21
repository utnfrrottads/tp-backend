const { Sequelize } = require('sequelize');
const config = require('../db-config.json');

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

try {
    sequelize.authenticate();
    console.log('Database connection successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
};

module.exports = sequelize
