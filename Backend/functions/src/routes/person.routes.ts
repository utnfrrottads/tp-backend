import * as express from 'express';
import * as functions from 'firebase-functions';
import { check, param } from 'express-validator/check';
import { sanitizeBody } from 'express-validator/filter';
import * as cors from 'cors';
const PersonsController = require('../controllers/person.controller');
const { validate } = require('../utils/middlewares/validation');

const person = express();
person.use(cors({ origin: true }));

/**
* `GETS` all persons of the collection.
*/
person.get('/', validate, PersonsController.getAllPersons);
/**
* `GETS` a Person and it's health insurances by personId
*
* @returns The list of person retrieved and a list of healthInsurances
*/
person.get('/getPersonAndHealthInsurancesById/:idPerson', [
    param('idPerson').not().isEmpty().withMessage('El campo idPerson es requerido'),
    param('idPerson').isLength({ min: 20, max: 20 }).withMessage('El idPerson debe tener 20 caracteres'),
    param('idPerson').isAlphanumeric().withMessage('El idPerson debe ser alfanumérico'),
], validate, PersonsController.getPersonAndHealthInsurancesById);
/**
* `GETS` a Person and it's health insurances by dni
*
* @returns The list of person retrieved and a list of healthInsurances
*/
person.get('/getPersonAndHealthInsurancesByDni/:dni', [
    param('dni').not().isEmpty().withMessage('El campo dni es requerido'),
], validate, PersonsController.getPersonAndHealthInsurancesByDni);
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
    sanitizeBody(['dni', 'firstName', 'lastName', 'bornDate', 'gender', 'phone', 'bloodType', 'emergencyContact', 'nurseWorkId', 'user', 'password']).trim(),
], validate, PersonsController.createPerson);
/**
* `CREATES` a EmergencyContact.
*/
person.post('/createEmergencyContact', [
    check('dni').not().isEmpty().withMessage('El campo dni es requerido'),
    check('firstName').not().isEmpty().withMessage('El campo firstName es requerido'),
    check('lastName').not().isEmpty().withMessage('El campo lastName es requerido'),
    check('bornDate').not().isEmpty().withMessage('El campo bornDate es requerido'),
    check('gender').not().isEmpty().withMessage('El campo gender es requerido'),
    check('phone').not().isEmpty().withMessage('El campo phone es requerido'),
    check('bloodType').not().isEmpty().withMessage('El campo bloodType es requerido'),
    sanitizeBody(['dni', 'firstName', 'lastName', 'bornDate', 'gender', 'phone', 'bloodType', 'emergencyContact', 'nurseWorkId', 'user', 'password']).trim(),
], validate, PersonsController.createEmergencyContact);
/**
* `CREATES` a nurse.
*/
person.post('/createNurse', [
    check('dni').not().isEmpty().withMessage('El campo dni es requerido'),
    check('firstName').not().isEmpty().withMessage('El campo firstName es requerido'),
    check('lastName').not().isEmpty().withMessage('El campo lastName es requerido'),
    check('bornDate').not().isEmpty().withMessage('El campo bornDate es requerido'),
    check('gender').not().isEmpty().withMessage('El campo gender es requerido'),
    check('phone').not().isEmpty().withMessage('El campo phone es requerido'),
    check('nurseWorkId').not().isEmpty().withMessage('El campo nurseWorkId es requerido'),
    check('user').not().isEmpty().withMessage('El campo user es requerido'),
    check('password').not().isEmpty().withMessage('El campo password es requerido'),
    sanitizeBody(['dni', 'firstName', 'lastName', 'bornDate', 'gender', 'phone', 'bloodType', 'emergencyContact', 'nurseWorkId', 'user', 'password']).trim(),
], validate, PersonsController.createNurse);
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
], validate, PersonsController.addToHealthInsuranceByIds);

/**
* `UPDATES` a person by ID.
*/
person.put('/updatePersonById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
    sanitizeBody(['name', 'address', 'locality', 'phone', 'atentionLevel']).trim(),
], validate, PersonsController.updatePersonById);

/**
* `ADD` an EmergencyContact by personId and contactId.
*/
person.put('/addEmergencyContactById/:personId/:contactId', [
    param('personId').not().isEmpty().withMessage('El campo personId es requerido'),
    param('personId').isLength({ min: 20, max: 20 }).withMessage('El personId debe tener 20 caracteres'),
    param('personId').isAlphanumeric().withMessage('El personId debe ser alfanumérico'),
    param('contactId').not().isEmpty().withMessage('El campo contactId es requerido'),
    param('contactId').isLength({ min: 20, max: 20 }).withMessage('El contactId debe tener 20 caracteres'),
    param('contactId').isAlphanumeric().withMessage('El contactId debe ser alfanumérico'),
], validate, PersonsController.addEmergencyContactById);

/**
* `DELETES` a person by ID.
*/
person.delete('/deletePersonById/:id', [
    param('id').not().isEmpty().withMessage('El campo id es requerido'),
    param('id').isLength({ min: 20, max: 20 }).withMessage('El Id debe tener 20 caracteres'),
    param('id').isAlphanumeric().withMessage('El id debe ser alfanumérico'),
], validate, PersonsController.deletePersonById);

export const persons = functions.https.onRequest(person);