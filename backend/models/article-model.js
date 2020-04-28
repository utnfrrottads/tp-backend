'use strict'

const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');
const Supplier = require('./supplier-model');
const Supplier_Article = require('./supplier-article-model');

const Article = sequelize.define('articulos', {
    id_articulo: { type: Sequelize.INTEGER, primaryKey: true },
    descripcion: Sequelize.STRING,
    precio: Sequelize.DECIMAL(10, 2),
    stock: Sequelize.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Article;