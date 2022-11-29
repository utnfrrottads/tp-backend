const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Repair = require('./repair');
const SparePart = require('./sparePart');

const RepairSpare = sequelize.define('repair_spare', {
    repairId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Repair,
            key: 'repairId'
        }
    },
    sparePartId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        references: {
            model: SparePart,
            key: 'sparePartId'
        }
    },
    numberOfSpareParts: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'repair_spare',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "repairId" },
                { name: "sparePartId"}
            ]
        },
        {
            name: "fk_repairSpare_spare_idx",
            using: "BTREE",
            fields: [
                { name: "sparePartId" }
            ]
        },
        {
            name: "fk_repairSpare_repair_idx",
            using: "BTREE",
            fields: [
                { name: "repairId" }
            ]
        }
    ]
});

module.exports = RepairSpare;