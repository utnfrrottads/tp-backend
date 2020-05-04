'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };


Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey: 'id_articulo', otherKey: 'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey: 'id_articulo', otherKey: 'id_proveedor'});

articleController.getAll = async (req, res) => {
    const article = await Article.findAll({
        include: {
          model: Supplier,
          required: true
        },
        where: {
            id_articulo: 1
        }
    });
    res.json(article);
}


module.exports = articleController;