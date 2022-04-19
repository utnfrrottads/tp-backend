const express = require('express');
const router = express.Router();
const controller = require('../controllers/evaluaciones-controller');


// Da de alta una nueva evaluación.
router.post('/', async (req, res, next) => {
    try {
        const evaluation = await controller.createEvaluacion(req.body);
        res.status(200).json(evaluation);
    } catch (error) {
        next(error);
    }
});

// Modifica los datos de la evaluación.
router.put('/:id_evaluacion', async (req, res, next) => {
    try {
        await controller.updateEvaluacion(req.params.id_evaluacion, req.body);
        res.status(200).json('Evaluation updated successfully');
    } catch (error) {
        next(error);
    }
});

// Elimina una evaluación.
router.delete('/:id_evaluacion', async (req, res, next) => {
    try {
        await controller.deleteEvaluacion(req.params.id_evaluacion);
        res.status(200).json('Evaluation deleted successfully');
    } catch (error) {
        next(error);
    }
});

// Devuelve los datos de la evaluación seleccionada.
router.get('/:id_evaluacion', async (req, res, next) => {
    try {
        const evaluation = await controller.getEvaluacion(req.params.id_evaluacion);
        res.status(200).json(evaluation);
    } catch (error) {
        next(error);
    }
});

// Devuelve todas las evaluaciones.
router.get('/', async (req, res, next) => {
    try {
        const evaluations = await controller.getEvaluaciones();
        res.status(200).json(evaluations);
    } catch (error) {
        next(error);
    }
});

module.exports = router;