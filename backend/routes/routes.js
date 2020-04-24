'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');


router.get('/clients', clientController.getAll); 
router.get('/clients/:id', clientController.getOne);
router.post('/addclient', clientController.createClient);

module.exports = router;