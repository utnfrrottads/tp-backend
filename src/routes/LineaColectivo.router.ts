import { Router } from 'express'
const router = Router()

import { getLineaColectivo, getLineaColectivos, createLineaColectivo, updateLineaColectivo, deleteLineaColectivo } from '../controller/LineaColectivo.controller'

router.get('./LineaColectivo', getLineaColectivos);
router.get('./LineaColectivo/:id', getLineaColectivo);
router.post('./LineaColectivo', createLineaColectivo);
router.put('./LineaColectivo', updateLineaColectivo);
router.delete('./LineaColectivo', deleteLineaColectivo);

export default router
