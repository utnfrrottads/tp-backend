import { Router } from 'express'
const router = Router()

import { createChofer, getChofer, getChoferes, updateChofer, deleteChofer } from '../controller/Chofer.controller'

router.get('/chofer', getChoferes);
router.get('/chofer/:cuil', getChofer);
router.post('/chofer', createChofer);
router.put('/chofer', updateChofer);
router.delete('/chofer/:cuil', deleteChofer);

export default router