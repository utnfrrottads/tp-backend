const express = require('express');
const saleRouter = express.Router(); //Creo el Router

const saleCtrl = require('../controllers/sale.controller'); //Importo el controlador de la BD
const saleValidator = require('../validators/sale.validator'); 

saleRouter.get('/', saleCtrl.getSales); //Si va con un metodo get es un GetAll
saleRouter.get('/:id', saleCtrl.getSale); //Si va con un metodo get y un ObjectId es un GetOne
saleRouter.get('/number/', saleCtrl.getNextTransactionNumber);
saleRouter.get('/byUser/:user', saleCtrl.getSalesByUser);
saleRouter.post('/', saleValidator.validateSaleCreate, saleCtrl.createSale); //Si va con un post es un Create
saleRouter.delete('/:id', saleCtrl.deleteSale); //Si va con un delete es un Delete al ObjectId especificado

module.exports = saleRouter; //Exporto para requerirlo en otro lado