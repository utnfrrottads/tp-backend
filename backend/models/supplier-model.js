const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Supplier = sequelize.define('proveedores', {
    id_proveedor: { type: DataTypes.INTEGER, primaryKey: true },
    cuit: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    activo: { type: DataTypes.STRING, defaultValue: 'si' }
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier;