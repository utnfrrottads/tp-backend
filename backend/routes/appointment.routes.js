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


router.get('/',[],appointmentCtrl.getAppointments);
router.get('/:id',[],appointmentCtrl.getAppointment);
router.post('/',[validateCreatedDate,
                check('date','Date field is required').not().isEmpty(),
                check('user','User field is required and must be a correct ID').isMongoId(),
                check('field','Field is required and must be a correct ID').isMongoId(),
                validateFields],appointmentCtrl.createAppointment);
router.put('/:id',[validateCreatedDate,
                    validateMaxTime,
                    check('date','Date field is required').not().isEmpty(),
                    validateFields],appointmentCtrl.updateAppointment);
router.delete('/:id',[validateMaxTime],appointmentCtrl.deleteAppointment);

//FALTA EL GET DISPONIBLES
//falta actualizar el estado si se llega a la fecha del turno

module.exports = router;

