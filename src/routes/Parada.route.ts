import { Router } from 'express'
const router = Router();

import { getParada, getParadas, createParada, updateParada, deleteParada } from '../controller/Parada.controller'

router.get('/paradaColectivo', getParadas);
router.get('/paradaColectivo/:NroParada', getParada);
router.post('/paradaColectivo', createParada);
router.put('/paradaColectivo', updateParada);
router.delete('/paradaColectivo/:NroParada', deleteParada);

export default router