import { Router } from 'express'
const router = Router()

import { createChofer, getChofer, getChoferes, updateChofer, deleteChofer } from '../controller/Chofer.controller'

router.get('/getChoferes', getChoferes);
router.get('/getChofer/:cuil', getChofer);
router.post('/createChofer', createChofer);
router.put('/updateChoferes', updateChofer);
router.delete('/deleteChoferes/:cuil', deleteChofer);

export default router