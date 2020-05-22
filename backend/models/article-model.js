'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Article = sequelize.define('articulos', {
    id_articulo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL(10, 2),
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    activo: {type: DataTypes.BOOLEAN, defaultValue: 1}
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Article;