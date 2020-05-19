'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

articleController.getAll = async (req, res) => {
  await Article.findAll({
    include: Supplier,
    required: true,
    where: {activo: 1}
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
      model: Supplier
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
    await Article.create({
      descripcion: req.body.descripcion,
      precio: req.body.precio
    })
    .then(res.json("Article created"))
    .catch(err => res.json(err));
}


articleController.updateArticle = async (req, res) => {
    await Article.update({
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock
  }, {
    where: {
      id_articulo: req.params.id
    }
  })
    .then(res.json("Article updated"))
    .catch(err => console.log(err));
}


articleController.loadStock = async (req, res) => {
  let cant_total = 0;
  let cantidad = parseInt(req.body.cantidad);
  
  await Article.findByPk(req.body.id_articulo,{
      attributes: ['stock']
    })
      .then(article => {
        cant_total = article.stock + cantidad;
      })
      .catch(err => console.log(err));

    await Article.update({
      stock: cant_total
    },{
      where: { 
        id_articulo: req.body.id_articulo 
      }
    })
  }

articleController.suspendArticle = async (req, res) => {
  await Article.update(
      {activo: 0},
      {where: { id_articulo: req.params.id }}
  )
      .then(res.json('Article suspended'))
      .catch(err => console.log(err));
}

module.exports = articleController;