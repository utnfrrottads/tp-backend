'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addclient', clientController.createClient);

//Rutas de proveedores
router.get('/providers', providerController.getAll); 
router.get('/providers/:id', providerController.getOne);
router.post('/addprovider', providerController.createClient);

module.exports = router;