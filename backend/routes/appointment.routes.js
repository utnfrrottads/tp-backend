/*
RUTA: http:localhost:0000/api/appointments'
*/
const express = require('express');
const router  = express.Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const appointmentCtrl = require('../controllers/appointment.controller');
const {validateMaxTime} = require('../middlewares/validateMaxTime');
const {validateCreatedDate} = require('../middlewares/validateCreatedDate');
const {validateJWT} = require('../middlewares/validateJWT');


router.get('/',[validateJWT],appointmentCtrl.getAppointments);
router.get('/user',[validateJWT],appointmentCtrl.getUserAppointments);
router.get('/:id',[validateJWT],appointmentCtrl.getAppointment);

//RUTA DE DISPONIBILIDAD
// router.get('/available/?date_init&date_end',[],appointmentCtrl.getAppointmentsByParams)
// router.get('/available/:field?date_init&date_end',[],appointmentCtrl.getAppointmentsByParams)

router.post('/',[validateJWT,
                validateCreatedDate,
                check('date','Date field is required').not().isEmpty(),
                check('user','User field is required and must be a correct ID').isMongoId(),
                check('field','Field is required and must be a correct ID').isMongoId(),
                validateFields],appointmentCtrl.createAppointment);
router.put('/:id',[validateJWT,
                    validateCreatedDate,
                    validateMaxTime,
                    check('date','Date field is required').not().isEmpty(),
                    validateFields],appointmentCtrl.updateAppointment);
router.delete('/:id',[validateJWT,
                    validateMaxTime],appointmentCtrl.deleteAppointment);

//falta actualizar el estado si se llega a la fecha del turno

module.exports = router;

