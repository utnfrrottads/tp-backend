import { Router } from 'express'
const router = Router()

import { getLineaColectivo, getLineaColectivos, createLineaColectivo, updateLineaColectivo, deleteLineaColectivo } from '../controller/LineaColectivo.controller'

router.get('/lineaColectivo', getLineaColectivos);
router.get('/lineaColectivo/:id', getLineaColectivo);
router.post('/lineaColectivo', createLineaColectivo);
router.put('/lineaColectivo', updateLineaColectivo);
router.delete('/lineaColectivo/:id', deleteLineaColectivo);

export default router
