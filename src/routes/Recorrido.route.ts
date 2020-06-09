import { Router } from 'express'
const router = Router();

import { getRecorridos, getRecorrido, createRecorrido, updateRecorrido, deleteRecorrido } from '../controller/Recorrido.controller'

router.get('./Recorridos', getRecorridos);    
router.get('./Recorridos/:IdRecorrido', getRecorrido);
router.post('./Recorridos', createRecorrido);
router.put('./Recorridos', updateRecorrido)
router.delete('./Recorridos', deleteRecorrido);

export default router