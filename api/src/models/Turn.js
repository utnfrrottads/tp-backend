const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Customer = require('./customer');

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
            name: "fk_turn_customer_idx",
            using: "BTREE",
            fields: [
                { name: "customerId" }
            ]
        }
    ]
});

module.exports = Turn;