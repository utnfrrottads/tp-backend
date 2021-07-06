import {Router} from 'express'
const router = Router()

import {getEmpresas, getEmpresa, deleteEmpresa, updateEmpresa, createEmpresa} from '../controller/Empresa.controller'

router.get('/empresa', getEmpresas);
router.post('/empresa', createEmpresa);
router.get('/empresa/:cuit', getEmpresa);
router.put('/empresa', updateEmpresa);
router.delete('/empresa/:cuit', deleteEmpresa);

export default router