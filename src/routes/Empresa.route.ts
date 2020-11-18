import {Router} from 'express'
const router = Router()

import {getEmpresas, getEmpresa, deleteEmpresa, updateEmpresa, createEmpresa} from '../controller/Empresa.controller'

router.get('/getEmpresa', getEmpresas);
router.post('/createEmpresa', createEmpresa);
router.get('/getEmpresa/:cuit', getEmpresa);
router.put('/UpdateEmpresa', updateEmpresa);
router.delete('/deleteEmpresa/:cuit', deleteEmpresa);

export default router