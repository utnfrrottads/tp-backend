'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');
const articleController = require('../controllers/article-controller');
const supplierController = require('../controllers/supplier-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addclient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/deleteClient/:id', clientController.deleteClient);

//Rutas de proveedores
router.get('/supplier', supplierController.getAll); 
router.get('/supplier/:id', supplierController.getOne);
router.post('/addprovider', supplierController.createClient);
router.put('/provider/:id', providerController.updateProvider);
router.delete('/deleteprovider/:id', providerController.deleteProvider);

//Rutas de articulos
router.get('articles', articleController.getAll);

module.exports = router;