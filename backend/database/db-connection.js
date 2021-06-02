const { Sequelize } = require('sequelize');
const config = require('../db-config.json');


const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

try {
    sequelize.authenticate();
    console.log('Database connection successfully.');
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
};