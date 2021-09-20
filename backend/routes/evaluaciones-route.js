const express = require('express');
const router = express.Router();

const controller = require('../controllers/evaluaciones-controller');

// Da de alta una nueva evaluación.
router.post('/', async (req, res) => {
    try {
        await controller.createEvaluacion(req.body);
        res.status(200).json('Evaluation created successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Modifica los datos de la evaluación.
router.put('/:id_evaluacion', async (req, res) => {
    try {
        await controller.updateEvaluacion(req.params.id_evaluacion, req.body);
        res.status(200).json('Evaluation updated successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Elimina una evaluación.
router.delete('/:id_evaluacion', async (req, res) => {
    try {
        await controller.deleteEvaluacion(req.params.id_evaluacion);
        res.status(200).json('Evaluation deleted successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Devuelve los datos de la evaluación seleccionada.
router.get('/:id_evaluacion', async (req, res) => {
    try {
        let evaluation = await controller.getEvaluacion(req.params.id_evaluacion);
        res.status(200).json(evaluation);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

// Devuelve todas las evaluaciones.
router.get('/', async (req, res) => {
    try {
        let evaluations = await controller.getEvaluaciones();
        res.status(200).json(evaluations);
    } catch (error) {
        res.status(400).json(error.message);
    }
});

module.exports = router;