'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };


Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});//, otherKey: 'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});//, otherKey: 'id_proveedor'});

articleController.getAll = async (req, res) => {
    const article = await Article.findAll({
        include: {
          model: Supplier,
          required: true,
          attributes: ['cuit']
        },
        attributes: ['precio']
        // where: {
        //     id_articulo: 1
        // }
    })
    .then(article => {res.json(article);})
    .catch(err => {res.json(err)});    
}


module.exports = articleController;