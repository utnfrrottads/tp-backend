const express = require('express');
const router = express.Router();

const controller = require('../controllers/evaluaciones-controller');

router.get('/', async (req, res) => {
    try {
        let evaluaciones = await controller.getEvaluaciones();
        res.status(200).json(evaluaciones);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        let evaluacion = await controller.getEvaluacion(req.params.id);
        res.status(200).json(evaluacion);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        let evaluacion = await controller.postEvaluacion(req.body);
        res.status(201).json(evaluacion);
    } catch (error) {
        res.status(400).json(error.meesage);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let evaluacion = await controller.putEvaluacion(req.params.id, req.body);
        res.status(200).json(evaluacion);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await controller.deleteEvaluacion(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;