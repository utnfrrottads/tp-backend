'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };


Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

articleController.getAll = async (req, res) => {
    await Article.findAll({
        include: {
          model: Supplier,
          required: true
        }
    })
    .then(articles => {
      res.json(articles)
    })
    .catch(err => {
      res.json(err)
    });    
}


module.exports = articleController;