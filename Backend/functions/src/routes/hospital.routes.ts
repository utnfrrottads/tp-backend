import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const HospitalsController = require('../controllers/hospital.controller');
const { validate } = require('../utils/middlewares/validation');

const hospital = express();
hospital.use(cors({ origin: true }));

/**
* `GETS` all hospitals of the collection.
*/
hospital.get('/', validate, HospitalsController.getAllHospitals);
/**
* `GETS` the closest hospitals by lat long.
*/
hospital.put('/getClosestHospitals', [
    sanitizeBody(['atentionLevel']).trim(),
    check('atentionLevel').not().isEmpty().withMessage('El campo atentionLevel es requerido'),
], validate, HospitalsController.getClosestHospitals);
/**
* `GETS` all AccidentOrDiseases of the Hospital.
*/
hospital.get('/getAllAccidentsOrDiseasesById/:idHospital', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
], validate, HospitalsController.getAllAccidentsOrDiseasesById);
/**
* `GETS` all HealthInsurances of the Hospital.
*/
hospital.get('/getAllHealthInsurancesById/:idHospital', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
], validate, HospitalsController.getAllHealthInsurancesById);
/**
* `GETS` all Beds of the Hospital.
*/
hospital.get('/getAllBedsById/:idHospital', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
], validate, HospitalsController.getAllBedsById);
/**
* `CREATES` a hospital.
*/
hospital.post('/createHospital', [
    check('name').not().isEmpty().withMessage('El campo name es requerido'),
    check('address').not().isEmpty().withMessage('El campo address es requerido'),
    check('locality').not().isEmpty().withMessage('El campo locality es requerido'),
    check('phone').not().isEmpty().withMessage('El campo phone es requerido'),
    check('location').not().isEmpty().withMessage('El campo location es requerido'),
    check('atentionLevel').not().isEmpty().withMessage('El campo atentionLevel es requerido'),
    sanitizeBody(['name', 'address', 'locality', 'phone', 'atentionLevel']).trim(),
], validate, HospitalsController.createHospital);

/**
* `ADDS` an AccidentOrDisease treated by hospital.
*/
hospital.post('/addToAccidentOrDiseaseByIds/:idHospital/:idAccidentOrDisease', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
    param('idAccidentOrDisease').not().isEmpty().withMessage('El campo idAccidentOrDisease es requerido'),
    param('idAccidentOrDisease').isLength({ min: 20, max: 20 }).withMessage('El idAccidentOrDisease debe tener 20 caracteres'),
    param('idAccidentOrDisease').isAlphanumeric().withMessage('El idAccidentOrDisease debe ser alfanumérico'),
], validate, HospitalsController.addToAccidentOrDiseaseByIds);

/**
* `UPDATES` a hospital by ID.
*/
hospital.put('/updateHospitalById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['name', 'address', 'locality', 'phone', 'atentionLevel']).trim(),
], validate, HospitalsController.updateHospitalById);

/**
* `DELETES` a hospital by ID.
*/
hospital.delete('/deleteHospitalById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, HospitalsController.deleteHospitalById);

export const hospitals = functions.https.onRequest(hospital);