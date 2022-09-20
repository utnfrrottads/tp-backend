const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');

const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    roleDescription: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, 
{
    sequelize,
    tableName: 'role',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "roleId" }
            ]
        }
    ]
});

module.exports = Role;