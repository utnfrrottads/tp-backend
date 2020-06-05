import {Router} from 'express'
const router = Router()

import {getEmpresas, getEmpresa, deleteEmpresa, updateEmpresa, createEmpresa} from '../controller/Empresa.controller'

router.get('/Empresas', getEmpresas);
router.get('/Empresas', createEmpresa);
router.post('/Empresas/:cuit', getEmpresa);
router.put('/Empresas/:cuit', updateEmpresa);
router.delete('/Empresas/:cuit', deleteEmpresa);

export default router