import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const AccidentOrDiseasesController = require('../controllers/accidentOrDisease.controller');
const { validate } = require('../utils/middlewares/validation');

const accidentOrDisease = express();
accidentOrDisease.use(cors({ origin: true }));

/**
* `GETS` all accidentOrDiseases of the collection.
*/
accidentOrDisease.get('/', validate, AccidentOrDiseasesController.getAllaccidentOrDiseases);
/**
* `CREATES` a accidentOrDisease.
*/
accidentOrDisease.post('/createAccidentOrDisease', [
    check('description').not().isEmpty().withMessage('El campo description es requerido'),
    sanitizeBody(['description']).trim(),
], validate, AccidentOrDiseasesController.createAccidentOrDisease);

/**
* `ADDS` an AffiliatedAccidentOrDisease.
*/
accidentOrDisease.post('/addToHospitalByIds/:idHospital/:idAccidentOrDisease', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
    param('idAccidentOrDisease').not().isEmpty().withMessage('El campo idAccidentOrDisease es requerido'),
    param('idAccidentOrDisease').isLength({ min: 20, max: 20 }).withMessage('El idAccidentOrDisease debe tener 20 caracteres'),
    param('idAccidentOrDisease').isAlphanumeric().withMessage('El idAccidentOrDisease debe ser alfanumérico'),
], validate, AccidentOrDiseasesController.addToHospitalByIds);

/**
* `UPDATES` a AccidentOrDisease by ID.
*/
accidentOrDisease.put('/updateAccidentOrDiseaseById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['description']).trim(),
], validate, AccidentOrDiseasesController.updateAccidentOrDiseaseById);

/**
* `DELETES` a accidentOrDisease by ID.
*/
accidentOrDisease.delete('/deleteAccidentOrDiseaseById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, AccidentOrDiseasesController.deleteAccidentOrDiseaseById);

export const accidentOrDiseases = functions.https.onRequest(accidentOrDisease);