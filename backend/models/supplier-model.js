'use strict'

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Article = require('./article-model');
const Supplier_Article = require('./supplier-article-model');

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});

const Supplier = sequelize.define('proveedores', {
    id_proveedor: { type: DataTypes.INTEGER, primaryKey: true },
    cuit: DataTypes.STRING,
    razon_social: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    direccion: {type: DataTypes.STRING}, //allowNull:false, validate:{msg: "Fill this field"}},
    telefono: DataTypes.STRING,
    activo: {type: DataTypes.BOOLEAN, defaultValue: 1}
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier;