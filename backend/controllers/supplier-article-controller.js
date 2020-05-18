'use strict'

const SupplierArticle = require('../models/supplier-article-model');
const supplierArticleController = { };

supplierArticleController.addPurchase = async (req, res) => {
    await SupplierArticle.create({
        id_proveedor: req.body.id_proveedor,
        id_articulo: req.body.id_articulo,
        precio_unitario: req.body.precio_unitario,
        cantidad: req.body.cantidad
    })
      .then(res.json("Purchase added"))
      .catch(err => console.log(err))
}

module.exports = supplierArticleController;