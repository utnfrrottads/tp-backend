'use strict'

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client-controller');

router.get('/clients', clientController.getAll); 



module.exports = router;