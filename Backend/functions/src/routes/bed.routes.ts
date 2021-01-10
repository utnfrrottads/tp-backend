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
* `CREATES` a bed by idHospital and adds it as a subcollection.
*/
bed.post('/createBedByIdHospital/:id', [
  param('id').not().isEmpty().withMessage('El campo id es requerido'),
  param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
  param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
  check('status').not().isEmpty().withMessage('El campo status es requerido'),
  check('type').not().isEmpty().withMessage('El campo type es requerido'),
  check('subtype').not().isEmpty().withMessage('El campo subtype es requerido'),
  check('description').not().isEmpty().withMessage('El campo description es requerido'),
  sanitizeBody(['status', 'type', 'subtype', 'description']).trim(),
], BedsController.createBedByIdHospital);

/**
* `UPDATES` a bed by idHospital and idBed.
*/
bed.put('/updatebyIds/:idHospital/:idBed', [
  param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
  param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
  param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
  param('idBed').not().isEmpty().withMessage('El campo idBed es requerido'),
  param('idBed').isLength({ min: 20, max: 20 }).withMessage('El idBed debe tener 20 caracteres'),
  param('idBed').isAlphanumeric().withMessage('El idBed debe ser alfanumérico'),
  sanitizeBody(['status', 'type', 'subtype', 'description']).trim(),
], BedsController.updatebyIds);

/**
* `DELETES` a bed by idHospital and idBed.
*/
bed.delete('/deleteBedByIds/:idHospital/:idBed', [
  param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
  param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
  param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
  param('idBed').not().isEmpty().withMessage('El campo idBed es requerido'),
  param('idBed').isLength({ min: 20, max: 20 }).withMessage('El idBed debe tener 20 caracteres'),
  param('idBed').isAlphanumeric().withMessage('El idBed debe ser alfanumérico'),
], BedsController.deleteBedByIds);

export const beds = functions.https.onRequest(bed);