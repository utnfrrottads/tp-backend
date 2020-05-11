'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');

const Article = sequelize.define('articulos', {
    id_articulo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    descripcion: DataTypes.STRING,
    precio: DataTypes.DECIMAL(10, 2),
    stock: DataTypes.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Article;