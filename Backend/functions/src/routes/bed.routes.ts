import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const BedsController = require('../controllers/bed.controller');

const bed = express();
bed.use(cors({ origin: true }));

/**
* `GETS` all beds of the collection.
*/
bed.get('/', BedsController.getAllBeds);

/**
* `CREATES` a bed.
*/
bed.post('/createBed', [
  check('status').not().isEmpty().withMessage('El campo status es requerido'),
  check('type').not().isEmpty().withMessage('El campo type es requerido'),
  check('subtype').not().isEmpty().withMessage('El campo subtype es requerido'),
  check('description').not().isEmpty().withMessage('El campo description es requerido'),
  sanitizeBody(['status', 'type', 'subtype', 'description']).trim(),
], BedsController.createBed);

/**
* `UPDATES` a bed by ID.
*/
bed.put('/updateBedById/:id', [
  param('id').not().isEmpty().withMessage('El campo id es requerido'),
  param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
  param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
  sanitizeBody(['status', 'type', 'subtype', 'description']).trim(),
], BedsController.updateBedById);

/**
* `DELETES` a bed by ID.
*/
bed.delete('/deleteBedById/:id', [
  param('id').not().isEmpty().withMessage('El campo id es requerido'),
  param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
  param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], BedsController.deleteBedById);

export const beds = functions.https.onRequest(bed);