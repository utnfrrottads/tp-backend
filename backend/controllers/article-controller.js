'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

articleController.getAll = async (req, res) => {
    Supplier.belongsToMany(Article, {through: 'Supplier_Article'});
    Article.belongsToMany(Supplier, {through: 'Supplier_Article'});
    await Article.findAll({ 
        include: [Supplier]
    })
        .then(article => res.json(article))
        .catch(err => console.log(err));
}

module.exports = articleController;