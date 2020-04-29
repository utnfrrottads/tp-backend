'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

articleController.getAll = async (req, res) => {
    Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey: 'id_articulo', foreignKey: 'id_proveedor'});
    Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey: 'id_articulo', foreignKey: 'id_proveedor'});
    const article = await Article.findOne({
        where: {
            id_articulo: 1
        }
    });
     const supplier = await article.getProveedores();
     res.json(supplier.cuit);
    
}


module.exports = articleController;