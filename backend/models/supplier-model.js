'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Supplier = sequelize.define('proveedores', {
    id_proveedor: { type: DataTypes.INTEGER, primaryKey: true },
    cuit: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    direccion: {type: DataTypes.STRING}, //allowNull:false, validate:{msg: "Fill this field"}},
    telefono: DataTypes.STRING,
    activo: {type: DataTypes.BOOLEAN, defaultValue: 1}

    /* direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    activo: { type: DataTypes.STRING, defaultValue: 'si' } */
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier;