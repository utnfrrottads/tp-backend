import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const HealthInsurancesController = require('../controllers/healthInsurance.controller');
const { validate } = require('../utils/middlewares/validation');

const healthInsurance = express();
healthInsurance.use(cors({ origin: true }));

/**
* `GETS` all HealthInsurances of the collection.
*/
healthInsurance.get('/', validate, HealthInsurancesController.getAllHealthInsurances);
/**
* `CREATES` a healthInsurance.
*/
healthInsurance.post('/createHealthInsurance', [
    check('legalName').not().isEmpty().withMessage('El campo name es requerido'),
    check('fantasyName').not().isEmpty().withMessage('El campo address es requerido'),
    check('phone').not().isEmpty().withMessage('El campo phone es requerido'),
    sanitizeBody(['legalName', 'fantasyName', 'phone']).trim(),
], validate, HealthInsurancesController.createHealthInsurance);

/**
* `ADDS` an AffiliatedHealthInsurance.
*/
healthInsurance.post('/addToHospitalByIds/:idHospital/:idHealthInsurance', [
    param('idHospital').not().isEmpty().withMessage('El campo idHospital es requerido'),
    param('idHospital').isLength({ min: 20, max: 20 }).withMessage('El idHospital debe tener 20 caracteres'),
    param('idHospital').isAlphanumeric().withMessage('El idHospital debe ser alfanumérico'),
    param('idHealthInsurance').not().isEmpty().withMessage('El campo idHealthInsurance es requerido'),
    param('idHealthInsurance').isLength({ min: 20, max: 20 }).withMessage('El idHealthInsurance debe tener 20 caracteres'),
    param('idHealthInsurance').isAlphanumeric().withMessage('El idHealthInsurance debe ser alfanumérico'),
], validate, HealthInsurancesController.addToHospitalByIds);

/**
* `UPDATES` a HealthInsurance by ID.
*/
healthInsurance.put('/updateHealthInsuranceById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['legalName', 'fantasyName', 'phone']).trim(),
], validate, HealthInsurancesController.updateHealthInsuranceById);

/**
* `DELETES` a healthInsurance by ID.
*/
healthInsurance.delete('/deleteHealthInsuranceById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, HealthInsurancesController.deleteHealthInsuranceById);

export const healthInsurances = functions.https.onRequest(healthInsurance);