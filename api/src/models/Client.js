const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Client = sequelize.define('client', {
    clientId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    dni: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    street: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    streetNumber: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    floor: {
        type: DataTypes.STRING(45)
    },
    apartment: {
        type: DataTypes.STRING(45)
    },
    city: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    province: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: DataTypes.STRING(45)
    }
}, 
{
    sequelize,
    tableName: 'client',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "clientId" }
            ]
        },
        {
            name: "dni_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "dni" }
            ]
        }
    ]
});

module.exports = Client;