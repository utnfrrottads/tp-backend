'use strict'

const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');
const Article = require('./article-model');
const Supplier = require('./supplier-model');

const Supplier_Article = sequelize.define('proveedores_articulos', {
    id_articulo: { type: Sequelize.INTEGER, 
                   references: { 
                       model: Article, 
                       key: 'id_articulo'
                    }, 
                    primaryKey: true
                },
    id_proveedor: { type: Sequelize.INTEGER,
                    references: {
                        model: Supplier,
                        key: 'id_proveedor'
                    },
                    primaryKey: true 
                },
    fecha_compra: { type: Sequelize.DATE, primaryKey: true },
    precio_unitario: Sequelize.DECIMAL(10, 2),
    cantidad: Sequelize.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier_Article;