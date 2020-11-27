const express = require('express');
const noteRouter = express.Router(); //Creo el Router

const noteCtrl = require('../controllers/note.controller'); //Importo el controlador de la BD
const noteValidator = require('../validators/note.validator'); 

noteRouter.get('/', noteCtrl.getNotes); //Si va con un metodo get es un GetAll
noteRouter.get('/:id', noteCtrl.getNote); //Si va con un metodo get y un ObjectId es un GetOne
noteRouter.post('/', noteValidator.validateNoteCreate, noteCtrl.createNote); //Si va con un post es un Create
noteRouter.put('/:id', noteValidator.validateNoteUpdate, noteCtrl.updateNote); //Si va con un put es un Update al ObjectId especificado
noteRouter.delete('/:id', noteCtrl.deleteNote); //Si va con un delete es un Delete al ObjectId especificado

module.exports = noteRouter; //Exporto para requerirlo en otro lado