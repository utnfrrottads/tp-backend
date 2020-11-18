import { Router } from 'express'
const router = Router()


import { getCalendarios, getCalendario, createCalendario, updateCalendario, deleteCalendario } from '../controller/Calendario.controller'

router.get('/Calendario', getCalendarios);
router.get('/Calendario/:IdCalendario', getCalendario);
router.put('/Calendario', updateCalendario);
router.post('/Calendario', createCalendario);
router.delete('/Calendario', deleteCalendario);

export default router