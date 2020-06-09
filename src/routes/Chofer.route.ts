import { Router } from 'express'
const router = Router()

import { createChofer, getChofer, getChoferes, updateChofer, deleteChofer } from '../controller/Chofer.controller'

router.get('./Choferes', getChoferes);
router.get('./Choferes/:cuil', getChofer);
router.post('./Choferes', createChofer);
router.put('./Choferes', updateChofer);
router.delete('./Choferes/:cuil', deleteChofer);

export default router