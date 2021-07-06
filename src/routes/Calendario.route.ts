import { Router } from 'express'
const router = Router()


import { getCalendarios, getCalendario, createCalendario, updateCalendario, deleteCalendario } from '../controller/Calendario.controller'

router.get('/calendario', getCalendarios);
router.get('/calendario/:IdCalendario', getCalendario);
router.put('/calendario', updateCalendario);
router.post('/calendario', createCalendario);
router.delete('/calendario/:IdCalendario', deleteCalendario);

export default router