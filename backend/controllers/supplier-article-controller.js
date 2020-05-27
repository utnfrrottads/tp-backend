'use strict'

const Supplier_Article = require('../models/supplier-article-model');
const Article = require('../models/article-model');
const Supplier = require('../models/supplier-model');
const supplierArticleController = { };

Supplier.belongsToMany(Article, {through: Supplier_Article, foreignKey:'id_proveedor'});
Article.belongsToMany(Supplier, {through: Supplier_Article, foreignKey:'id_articulo'});

Supplier_Article.hasOne(Supplier, {foreignKey: 'id_proveedor'});
Supplier.belongsTo(Supplier_Article, {foreignKey: 'id_proveedor'});

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});


supplierArticleController.addPurchase = async (req, res) => {
    try {
        await Supplier_Article.create({
            id_proveedor: req.body.id_proveedor,
            id_articulo: req.body.id_articulo,
            precio_unitario: req.body.precio_unitario,
            cantidad: req.body.cantidad
        });
        res.json("Article added");
    } catch (err) {
        res.json(err);
    }
}

supplierArticleController.deletePurchase = async (req, res) => {
    let purchased_amount = 0;
    let stock_actual = 0;
    let current_amount = 0;

    try {
        let purchase = await Supplier_Article.findOne({
            attributes: ['cantidad'], 
            where: {
                id_articulo: req.params.id_articulo,
                id_proveedor: req.params.id_proveedor,
                fecha_compra: req.params.fecha_compra
            }
        });
        purchased_amount = parseInt(purchase.cantidad);
    
        let article = await Article.findOne({
            attributes: ['stock'],
            where: {
                id_articulo: req.params.id_articulo
            }
        });
        stock_actual = parseInt(article.stock);
    
        current_amount = stock_actual - purchased_amount
        
    
          await Article.update({
            stock: current_amount,
            }, {
                where: {
                    id_articulo: req.params.id_articulo
                }
            })  
        
        Supplier_Article.destroy({
            where: {
                id_articulo: req.params.id_articulo,
                id_proveedor: req.params.id_proveedor,
                fecha_compra: req.params.fecha_compra
            }
        });
        res.json("Purchase deleted");
    } catch (err) {
        res.json(err);
    }
    
}

supplierArticleController.getSupplierPurchases = async (req, res) => {
    try {
        const purchases = await Supplier_Article.findAll({
            order: [['fecha_compra', 'DESC']],
            where: {
                id_proveedor: req.params.id
            },
            include: [{
                    model: Supplier
                }, {
                    model: Article
                }
            ]
        })
        res.json(purchases);
    } catch (err) {
        res.json(err);
    }

}

module.exports = supplierArticleController;