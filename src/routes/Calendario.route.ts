import { Router } from 'express'
const router = Router()


import { getCalendarios, getCalendario, createCalendario, updateCalendario, deleteCalendario } from '../controller/Calendario.controller'

router.get('./Calendarios', getCalendarios);
router.get('./Calendarios/:IdCalendario', getCalendario);
router.put('./Calendarios', updateCalendario);
router.post('./Calendarios', createCalendario);
router.delete('./Calendarios', deleteCalendario);

export default router