const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Spare = sequelize.define('spare', {
    spareId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    spareCode: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
    },
    spareDescription: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sparePrice: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    spareSupplier: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'spare',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "spareId" }
            ]
        },
        {
            name: "spareCode_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "spareCode" }
            ]
        }
    ]
});

module.exports = Spare;