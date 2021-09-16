const router = require('express').Router();
const personasController = require('../controllers/personas-controller');
const evaluadoresController = require('../controllers/evaluadores-controller');


// Crear un nuevo evaluador.
router.post('/', async (req, res) => {
    try {
        await personasController.createPerson(req.body, 'evaluador');
        res.status(200).json('Evaluator created successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Modificar los datos de un evaluador.
router.put('/:id_persona', async (req, res) => {
    try {
        await personasController.updatePerson(req.params.id_persona, req.body, 'evaluador');
        res.status(200).json('Evaluator updated successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Eliminar un evaluador.
router.delete('/:id_persona', async (req, res) => {
    try {
        await personasController.deletePerson(req.params.id_persona, 'evaluador');
        res.status(200).json('Evaluator deleted successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Devuelve todos los evaluadores
router.get('/', async (req, res) => {
    try {
        const evaluators = await evaluadoresController.getEvaluadores();
        res.status(200).json(evaluators);
    } catch (error) {
        res.status(400).json( error.message );
    }
});


module.exports = router;