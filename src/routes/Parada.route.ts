import { Router } from 'express'
const router = Router();

import { getParada, getParadas, createParada, updateParada, deleteParada } from '../controller/Parada.controller'

router.get('/ParadaColectivo', getParadas);
router.get('/ParadaColectivo/:id', getParada);
router.post('/ParadaColectivo', createParada);
router.put('/ParadaColectivo', updateParada);
router.delete('/ParadaColectivo', deleteParada);

export default router