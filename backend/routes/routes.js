'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');
const articleController = require('../controllers/article-controller');
const supplierController = require('../controllers/supplier-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addClient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/deleteClient/:id', clientController.deleteClient);

//Rutas de proveedores
router.get('/supplier', supplierController.getAll); 
router.get('/supplier/:id', supplierController.getOne);
router.post('/addSupplier', supplierController.createSupplier);
router.put('/supplier/:id', supplierController.updateSupplier);
router.delete('/deleteSupplier/:id', supplierController.deleteSupplier);

//Rutas de articulos
router.get('articles', articleController.getAll);

module.exports = router;