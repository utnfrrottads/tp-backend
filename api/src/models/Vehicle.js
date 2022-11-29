const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Customer = require('./customer');

const Vehicle = sequelize.define('vehicle', {
    vehicleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    licensePlate: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    make: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    currentNumberKilometers: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false
    },
    customerId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Customer,
            key: 'customerId'
        }
    }
}, 
{
    sequelize,
    tableName: 'vehicle',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "vehicleId" }
            ]
        },
        {
            name: "licensePlate_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "licensePlate" }
            ]
        },
        {
            name: "fk_vehicle_customer_idx",
            using: "BTREE",
            fields: [
                { name: "customerId" }
            ]
        }
    ]
});

module.exports = Vehicle;