const router = require('express').Router();
const personasController = require('../controllers/personas-controller');
const evaluadoresController = require('../controllers/evaluadores-controller');


// Crear un nuevo evaluador.
router.post('/', async (req, res, next) => {
    try {
        const evaluator = await personasController.createPerson(req.body, 'evaluador');
        res.status(200).json(evaluator);
    } catch (error) {
        next(error);
    }
});


// Modificar los datos de un evaluador.
router.put('/:id_persona', async (req, res, next) => {
    try {
        await personasController.updatePerson(req.params.id_persona, req.body, 'evaluador');
        res.status(200).json('Evaluator updated successfully');
    } catch (error) {
        next(error);
    }
});


// Eliminar un evaluador.
router.delete('/:id_persona', async (req, res, next) => {
    try {
        await personasController.deletePerson(req.params.id_persona, 'evaluador');
        res.status(200).json('Evaluator deleted successfully');
    } catch (error) {
        next(error);
    }
});


// Devuelve todos los evaluadores
router.get('/', async (req, res, next) => {
    try {
        const evaluators = await evaluadoresController.getEvaluadores();
        res.status(200).json(evaluators);
    } catch (error) {
        next(error);
    }
});


module.exports = router;