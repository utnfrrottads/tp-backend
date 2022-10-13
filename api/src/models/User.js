const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Mechanic = require('./mechanic');

const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    mechanicId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Mechanic,
            key: 'mechanicId'
        }
    }
}, 
{
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "userId" }
            ]
        },
        {
            name: "username_UNIQUE",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "username" }
            ]
        },
        {
            name: "fk_user_mechanic_idx",
            using: "BTREE",
            fields: [
                { name: "mechanicId" }
            ]
        }
    ]
});

module.exports = User;