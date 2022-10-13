const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Mechanic = sequelize.define('mechanic', {
    mechanicId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    registrationNumber: {
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
    tableName: 'mechanic',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "mechanicId" }
            ]
        },
        {
            name: "registrationNumber_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "registrationNumber" }
            ]
        },
    ]
});

module.exports = Mechanic;