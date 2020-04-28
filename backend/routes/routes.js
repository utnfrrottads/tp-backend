'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');
const articleController = require('../controllers/article-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addclient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/deleteClient/:id', clientController.deleteClient);

//Rutas de proveedores
router.get('/providers', providerController.getAll); 
router.get('/providers/:id', providerController.getOne);
router.post('/addprovider', providerController.createClient);

//Rutas de articulos
router.get('articles', articleController.getAll);

module.exports = router;