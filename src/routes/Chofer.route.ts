import { Router } from 'express'
const router = Router()

import { createChofer, getChofer, getChoferes, updateChofer, deleteChofer } from '../controller/Chofer.controller'

router.get('/getChofere', getChoferes);
router.get('/getChofer/:cuil', getChofer);
router.post('/createChofer', createChofer);
router.put('/updateChofer', updateChofer);
router.delete('/deleteChofer/:cuil', deleteChofer);

export default router