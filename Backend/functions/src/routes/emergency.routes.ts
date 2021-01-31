import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const EmergencysController = require('../controllers/emergency.controller');
const { validate } = require('../utils/middlewares/authorization');

const emergency = express();
emergency.use(cors({ origin: true }));

/**
* `GETS` all emergencys of the collection.
*/
emergency.get('/', validate, EmergencysController.getAllemergencys);
/**
* `CREATES` a emergency.
*/
emergency.post('/createEmergency', [
    check('dateOfEntrance').not().isEmpty().withMessage('El campo dateOfEntrance es requerido'),
    check('dateOfExit').not().isEmpty().withMessage('El campo dateOfExit es requerido'),
    check('locality').not().isEmpty().withMessage('El campo locality es requerido'),
    check('ambulanceLicensePlate').not().isEmpty().withMessage('El campo ambulanceLicensePlate es requerido'),
    check('location').not().isEmpty().withMessage('El campo location es requerido'),
    sanitizeBody(['dateOfEntrance', 'dateOfExit', 'locality', 'location', 'ambulanceLicensePlate']).trim(),
], validate, EmergencysController.createEmergency);

/**
* `ADDS` an AccidentOrDisease treated by emergency.
*/
emergency.post('/addToAccidentOrDiseaseByIds/:idEmergency/:idAccidentOrDisease', [
    param('idEmergency').not().isEmpty().withMessage('El campo idEmergency es requerido'),
    param('idEmergency').isLength({ min: 20, max: 20 }).withMessage('El idEmergency debe tener 20 caracteres'),
    param('idEmergency').isAlphanumeric().withMessage('El idEmergency debe ser alfanumérico'),
    param('idAccidentOrDisease').not().isEmpty().withMessage('El campo idAccidentOrDisease es requerido'),
    param('idAccidentOrDisease').isLength({ min: 20, max: 20 }).withMessage('El idAccidentOrDisease debe tener 20 caracteres'),
    param('idAccidentOrDisease').isAlphanumeric().withMessage('El idAccidentOrDisease debe ser alfanumérico'),
], validate, EmergencysController.addToAccidentOrDiseaseByIds);

/**
* `UPDATES` a emergency by ID.
*/
emergency.put('/updateemergencyById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['dateOfEntrance', 'dateOfExit', 'locality', 'location', 'ambulanceLicensePlate']).trim(),
], validate, EmergencysController.updateEmergencyById);

/**
* `DELETES` a emergency by ID.
*/
emergency.delete('/deleteEmergencyById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, EmergencysController.deleteEmergencyById);

export const emergencys = functions.https.onRequest(emergency);