'use strict'

const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const Supplier_Article = require('../models/supplier-article-model');
const articleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {as:'Supplier', through: Supplier_Article, foreignKey:'id_articulo'});

articleController.getAll = async (req, res) => {
  await Article.findAll({
    include: 'Supplier',
    required: true
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
      as: 'Supplier',               //OTRA FORMA DE HACER LO MISMO QUE ARRIBAs
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
    const supplier = await Supplier.findByPk(req.body.Supplier.id_proveedor);
    let article = null;

    await Article.create({
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      stock: req.body.stock
    })
      .then(art => article = art);
      
      await article.addSupplier(supplier, { through: {
        precio_unitario: req.body.Supplier[0].proveedores_articulos.precio_unitario,
        cantidad: req.body.Supplier[0].proveedores_articulos.cantidad
        } 
    }) 
}






module.exports = articleController;