const express = require('express');
const router = express.Router();

const controller = require('../controllers/empresas-controller');

router.get('/', async (req, res) => {
    try {
        let empresas = await controller.getEmpresas();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let empresa = await controller.getEmpresa(req.params.id);
        res.status(200).json(empresa);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        let empresa = await controller.postEmpresa(req.body);
        res.status(201).json(empresa);
    } catch (error) {
        res.status(400).json(error.meesage);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let empresa = await controller.putEmpresa(req.params.id, req.body);
        res.status(200).json(empresa);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await controller.deleteEmpresa(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;
