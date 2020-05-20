

const sequelize = require('../database/db-connection');
const { DataTypes } = require('Sequelize');
const Sequelize = require ('Sequelize');
const Article = require('./article-model');
const Supplier = require('./supplier-model');

const Supplier_Article = sequelize.define('proveedores_articulos', {
    id_articulo: { type: DataTypes.INTEGER, 
                   primaryKey: true,
                   references: { 
                       model: Article, 
                       key: 'id_articulo'
                    }
                },
    id_proveedor: { type: DataTypes.INTEGER,
                    primaryKey: true,
                    references: {
                        model: Supplier,
                        key: 'id_proveedor'
                    }
                },
    fecha_compra: { type: DataTypes.DATE, primaryKey: true, defaultValue: Sequelize.NOW },
    precio_unitario: DataTypes.DECIMAL(10, 2),
    cantidad: DataTypes.INTEGER
},{
    createdAt: false,
    updatedAt: false
});

module.exports = Supplier_Article;