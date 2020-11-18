import { Router } from 'express'
const router = Router()

import { getLineaColectivo, getLineaColectivos, createLineaColectivo, updateLineaColectivo, deleteLineaColectivo } from '../controller/LineaColectivo.controller'

router.get('/getLineaColectivo', getLineaColectivos);
router.get('/getLineaColectivo/:id', getLineaColectivo);
router.post('/createLineaColectivo', createLineaColectivo);
router.put('/updateLineaColectivo', updateLineaColectivo);
router.delete('/deleteLineaColectivo/:id', deleteLineaColectivo);

export default router
