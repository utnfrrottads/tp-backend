'use strict'

const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');

const Supplier = sequelize.define('proveedores', {
    id_proveedor: { type: Sequelize.INTEGER, primaryKey: true },
    cuit: Sequelize.STRING,
    razon_social: Sequelize.STRING,
    ciudad: Sequelize.STRING,
    direccion: Sequelize.STRING,
    telefono: Sequelize.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier;