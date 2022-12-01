const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Configuration = sequelize.define('configuration', {
    maximumShiftsPerDay: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    lowStock: {
        type: DataTypes.INTEGER.UNSIGNED
    }
}, 
{
    sequelize,
    tableName: 'configuration',
    timestamps: false,
    indexes: []
});

module.exports = Configuration;