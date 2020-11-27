const express = require('express');
const roleRouter = express.Router(); //Creo el Router

const roleCtrl = require('../controllers/role.controller'); //Importo el controlador de la BD
const roleValidator = require('../validators/role.validator'); 

roleRouter.get('/', roleCtrl.getRoles); //Si va con un metodo get es un GetAll
roleRouter.get('/:id', roleCtrl.getRole); //Si va con un metodo get y un ObjectId es un GetOne
roleRouter.post('/', roleValidator.validateRoleCreate, roleCtrl.createRole); //Si va con un post es un Create
roleRouter.put('/:id', roleValidator.validateRoleUpdate, roleCtrl.updateRole); //Si va con un put es un Update al ObjectId especificado
roleRouter.delete('/:id', roleCtrl.deleteRole); //Si va con un delete es un Delete al ObjectId especificado

module.exports = roleRouter; //Exporto para requerirlo en otro lado