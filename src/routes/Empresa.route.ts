import {Router} from 'express'
const router = Router()

import {getEmpresas, getEmpresa, deleteEmpresa, updateEmpresa, createEmpresa} from '../controller/Empresa.controller'

router.get('/Empresas', getEmpresas);
router.post('/Empresas', createEmpresa);
router.get('/Empresas/:cuit', getEmpresa);
router.put('/Empresas', updateEmpresa);
router.delete('/Empresas/:cuit', deleteEmpresa);

export default router