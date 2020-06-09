import { Router } from 'express'
const router = Router();

import { getParada, getParadas, createParada, updateParada, deleteParada } from '../controller/Parada.controller'

router.get('./Paradas', getParadas);
router.get('./Paradas/:id', getParada);
router.post('./Paradas', createParada);
router.put('./Paradas', updateParada);
router.delete('./Paradas', deleteParada);

export default router