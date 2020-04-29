'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

articleController.getAll = async (req, res) => {
    Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey: 'id_articulo', foreignKey: 'id_proveedor'});
    Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey: 'id_articulo', foreignKey: 'id_proveedor'});
    await Article.findAll({
        include: [Supplier]
    })
        .then(articles => res.json(articles));
}


module.exports = articleController;