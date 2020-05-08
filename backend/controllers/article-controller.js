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


articleController.getOne = async (req, res) => {
  await Article.findByPk(req.params.id, {
    include: {
      model: Supplier,
      required: true
    }
  })
    .then(article => {
      res.json(article)
    })
    .catch(err => {
      res.json(err)
    });    
}

articleController.createArticle = async (req, res) => {
    const supplier = await Supplier.findByPk(1);

    const article = await Article.create({
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock
    });

    await article.addSupplier(supplier, { through: {
        precio_unitario: req.body.precio_unitario,
        cantidad: req.body.cantidad
        } 
    })

    const result = await Article.findOne({
      where: {descripcion: "test"},
      include: Supplier
    });

    res.json(result);

}



module.exports = articleController;