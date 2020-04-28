const conf = require('./db-config.json');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    conf.mysql.db, 
    conf.mysql.username, 
    conf.mysql.password, 
    {
        host: conf.mysql.host,
        dialect: conf.mysql.dialect
    }
);

module.exports = sequelize;

