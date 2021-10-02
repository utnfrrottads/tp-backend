const express = require('express');
const router = express.Router();

const controller = require('../controllers/empresas-controller');

router.get('/', async (req, res, next) => {
    try {
        let empresas = await controller.getEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let empresa = await controller.getEmpresa(req.params.id);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let empresa = await controller.postEmpresa(req.body);
        res.status(201).json(empresa);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        let empresa = await controller.putEmpresa(req.params.id, req.body);
        res.status(200).json(empresa);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await controller.deleteEmpresa(req.params.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
