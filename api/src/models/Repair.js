const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Mechanic = require('./mechanic');
const Vehicle = require('./vehicle');

const Repair = sequelize.define('repair', {
    repairId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    entryDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    startDateTime: {
        type: DataTypes.DATE
    },
    endDateTime: {
        type: DataTypes.DATE
    },
    deliveryDateTime: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM,
        values: ['Entered', 'In progress', 'Completed', 'Delivered'],
        allowNull: false
    },
    initialDetail: {
        type: DataTypes.STRING(1000)
    },
    comments: {
        type: DataTypes.STRING(1000)
    },
    finalDescription: {
        type: DataTypes.STRING(1000)
    },
    laborPrice: {
        type: DataTypes.FLOAT.UNSIGNED
    },
    vehicleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Vehicle,
            key: 'vehicleId'
        }
    },
    mechanicId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: Mechanic,
            key: 'mechanicId'
        }
    }
}, 
{
    sequelize,
    tableName: 'repair',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "repairId" }
            ]
        },
        {
            name: "fk_repair_vehicle_idx",
            using: "BTREE",
            fields: [
                { name: "vehicleId" }
            ]
        },
        {
            name: "fk_repair_mechanic_idx",
            using: "BTREE",
            fields: [
                { name: "mechanicId" }
            ]
        },
    ]
});

module.exports = Repair;