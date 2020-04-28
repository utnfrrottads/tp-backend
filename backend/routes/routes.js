'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');
const articleController = require('../controllers/article-controller');

//Rutas de clientes
router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
<<<<<<< HEAD
router.post('/addclient', clientController.createClient);

//Rutas de proveedores
router.get('/providers', providerController.getAll); 
router.get('/providers/:id', providerController.getOne);
router.post('/addprovider', providerController.createClient);
=======
router.post('/addClient', clientController.createClient);
router.put('/clients/:id', clientController.updateClient);
router.delete('/deleteClient/:id', clientController.deleteClient);

router.get('articles', articleController.getAll);
>>>>>>> 8d479ae57e30266649b5f675e2f0a891fc515f8d

module.exports = router;