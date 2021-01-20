import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const PersonsController = require('../controllers/person.controller');

const person = express();
person.use(cors({ origin: true }));

/**
* `GETS` all persons of the collection.
*/
person.get('/', PersonsController.getAllPersons);
/**
* `CREATES` a person.
*/
person.post('/createPerson', [
    check('dni').not().isEmpty().withMessage('El campo dni es requerido'),
    check('firstName').not().isEmpty().withMessage('El campo firstName es requerido'),
    check('lastName').not().isEmpty().withMessage('El campo lastName es requerido'),
    check('bornDate').not().isEmpty().withMessage('El campo bornDate es requerido'),
    check('gender').not().isEmpty().withMessage('El campo gender es requerido'),
    check('phone').not().isEmpty().withMessage('El campo phone es requerido'),    
    sanitizeBody(['dni', 'firstName', 'lastName', 'bornDate', 'gender','phone','bloodType','emergencyContact','nurseWorkId','user','password']).trim(),
], PersonsController.createPerson);

/**
* `ADDS` a HealthInsurance that belongs to the person.
*/
person.post('/addToHealthInsuranceById/:idPerson/:idHealthInsurance', [
    param('idPerson').not().isEmpty().withMessage('El campo idPerson es requerido'),
    param('idPerson').isLength({ min: 20, max: 20 }).withMessage('El idPerson debe tener 20 caracteres'),
    param('idPerson').isAlphanumeric().withMessage('El idPerson debe ser alfanumérico'),
    param('idHealthInsurance').not().isEmpty().withMessage('El campo idHealthInsurance es requerido'),
    param('idHealthInsurance').isLength({ min: 20, max: 20 }).withMessage('El idHealthInsurance debe tener 20 caracteres'),
    param('idHealthInsurance').isAlphanumeric().withMessage('El idHealthInsurance debe ser alfanumérico'),
], PersonsController.addToHealthInsuranceByIds);

/**
* `UPDATES` a person by ID.
*/
person.put('/updatePersonById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['name', 'address', 'locality', 'phone', 'atentionLevel']).trim(),
], PersonsController.updatePersonById);

/**
* `DELETES` a person by ID.
*/
person.delete('/deletePersonById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], PersonsController.deletePersonById);

export const persons = functions.https.onRequest(person);