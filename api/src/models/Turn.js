const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Client = require('./client');

const Turn = sequelize.define('turn', {
    turnId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    turnDateTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    turnCancellationDateTime: {
        type: DataTypes.DATE
    },
    clientId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Client,
            key: 'clientId'
        }
    }
}, 
{
    sequelize,
    tableName: 'turn',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "turnId" }
            ]
        },
        {
            name: "fk_turn_client_idx",
            using: "BTREE",
            fields: [
                { name: "clientId" }
            ]
        }
    ]
});

module.exports = Turn;