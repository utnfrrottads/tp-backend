const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const SparePart = sequelize.define('spare_part', {
    sparePartId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    sparePartCode: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    sparePartDescription: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sparePartPrice: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    sparePartSupplier: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'spare_part',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "sparePartId" }
            ]
        },
        {
            name: "sparePartCode_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "sparePartCode" }
            ]
        }
    ]
});

module.exports = SparePart;