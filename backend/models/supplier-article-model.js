'use strict'

const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');

const Supplier_Article = sequelize.define('proveedores_articulos', {
    id_articulo: { type: Sequelize.INTEGER, primaryKey: true },
    id_proveedor: { type: Sequelize.INTEGER, primaryKey: true },
    fecha_compra: { type: Sequelize.DATE, primaryKey: true },
    precio_unitario: Sequelize.DECIMAL(10, 2),
    cantidad: Sequelize.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier_Article;