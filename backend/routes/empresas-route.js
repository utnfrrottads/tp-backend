const express = require('express');
const router = express.Router();

const controller = require('../controllers/empresas-controller');

router.get('/', async (req, res, next) => {
    try {
        const companies = await controller.getEmpresas(req.query);
        res.status(200).json(companies);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const company = await controller.getEmpresa(req.params.id);
        res.status(200).json(company);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const company = await controller.createEmpresa(req.body);
        res.status(201).json(company);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await controller.updateEmpresa(req.params.id, req.body);
        res.status(200).json('Company updated successfully');
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await controller.deleteEmpresa(req.params.id);
        res.status(200).json('Company deleted successfully');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
