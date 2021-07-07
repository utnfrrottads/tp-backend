'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');
const articleController = require('../controllers/article-controller');
const supplierController = require('../controllers/supplier-controller');
const supplierArticleController = require('../controllers/supplier-article-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addClient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.put('/suspendClient/:id', clientController.suspendClient);
router.delete('/deleteClient/:id', clientController.deleteClient);

//Rutas de proveedores
router.get('/suppliers', supplierController.getAll); 
router.get('/suppliers/:id', supplierController.getOne);
router.post('/addSupplier', supplierController.createSupplier);
router.put('/suppliers/:id', supplierController.updateSupplier);
router.put('/suspendSupplier/:id', supplierController.suspendSupplier);
router.get('/lastSupplierPurchaseByArticle/:id_articulo', supplierController.lastSupplierPurchaseByArticle);

//Rutas de articulos
router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getOne);
router.post('/addArticle', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.put('/suspendArticle/:id', articleController.suspendArticle);
router.post('/loadStock', articleController.loadStock);


//Rutas de clientes-proveedores (compras)
router.post('/addPurchase', supplierArticleController.addPurchase);
router.delete('/deletePurchase/:id_articulo/:id_proveedor/:fecha_compra', supplierArticleController.deletePurchase);
router.get('/purchases/:id', supplierArticleController.getSupplierPurchases);

module.exports = router;