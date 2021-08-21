const router = require('express').Router();
const personasController = require('../controllers/personas-controller');

router.post('/', async (req, res) => {
    try {
        await personasController.createPerson(req.body, 'evaluador');
        res.status(200).json('Evaluator created successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});

// router.put('/:id_persona', evaluatorController.updateEvaluator); // Modifica los datos de una persona.
// router.delete('/:id_persona', evaluatorController.deleteEvaluator); // Elimina una persona.
// router.get('/', evaluatorController.getEvaluators);

module.exports = router;