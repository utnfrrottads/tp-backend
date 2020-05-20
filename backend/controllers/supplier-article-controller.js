'use strict'

const Supplier_Article = require('../models/supplier-article-model');
const Article = require('../models/article-model');
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

supplierArticleController.deletePurchase = async (req, res) => {
    let purchased_amount = 0;
    let stock_actual = 0;

    let purchase = await Supplier_Article.findOne({
        where: {
            id_articulo: req.params.id_articulo,
            id_proveedor: req.params.id_proveedor,
            fecha_compra: req.params.fecha_compra
        }
    })
        .catch(err => console.log(err));
    purchased_amount = parseInt(purchase.cantidad);
    

    let article = await Article.findOne({
        where: {
            id_articulo: req.params.id_articulo
        }
    })
        .catch(err => console.log(err));
    stock_actual = parseInt(article.stock);

    let current_value = stock_actual - purchased_amount

     await Article.update({
        stock: current_value,
        where: {
            id_articulo: req.params.id_articulo
        }
    }) 
    
    
    
     /* let artic = await Article.findOne({
        where: {
            id_articulo: req.params.id_articulo
        }
    })

    console.log(artic.stock);  */
}

module.exports = supplierArticleController;