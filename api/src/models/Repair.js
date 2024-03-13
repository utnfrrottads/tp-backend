const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Mechanic = require('./mechanic');
const Vehicle = require('./vehicle');
const { 
    IN_PROGRESS_REPAIR, 
    ENTERED_REPAIR, 
    COMPLETED_REPAIR, 
    DELIVERED_REPAIR
} = require('../utils/repairStatus');


const Repair = sequelize.define('repair', {
    repairId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    entryDateTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
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
        values: [ENTERED_REPAIR, IN_PROGRESS_REPAIR, COMPLETED_REPAIR, DELIVERED_REPAIR],
        defaultValue: ENTERED_REPAIR
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