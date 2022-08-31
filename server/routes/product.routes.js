const express = require('express');
const ProductCtrl = require('../controllers/product.controller');
const productRouter = express.Router(); //Creo el Router

const productCtrl = require('../controllers/product.controller'); //Importo el controlador de la BD
const productValidator = require('../validators/product.validator'); 

productRouter.get('/', productCtrl.getProducts); //Si va con un metodo get es un GetAll
productRouter.get('/:id', productCtrl.getProduct); //Si va con un metodo get y un ObjectId es un GetOne
productRouter.post('/', productValidator.validateProductCreate, productCtrl.createProduct); //Si va con un post es un Create
productRouter.put('/:id', productValidator.validateProductUpdate, productCtrl.updateProduct); //Si va con un put es un Update al ObjectId especificado
productRouter.delete('/:id', productCtrl.deleteProduct); //Si va con un delete es un Delete al ObjectId especificado
productRouter.post('/stock', ProductCtrl.getProductWithStock);

module.exports = productRouter; //Exporto para requerirlo en otro lado