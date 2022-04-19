const { Sequelize } = require('sequelize');
const config = require('../db-config.json');

const sequelize = new Sequelize(config.DATABASE, config.USERNAME, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
});

sequelize.authenticate().then(
    function (_value) {
        console.log('Database connection successful.');
    },
    function (error) {
        console.error('Unable to connect to the database. The following error was raised:\n'.red, error);
    }
);

module.exports = sequelize;
