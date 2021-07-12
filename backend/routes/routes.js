const router = require('express').Router();

const evaluatorPersonController = require('../controllers/evaluatorPerson-controller');


router.get('/', (req, res) => {
    res.send('Home!');
});


// Rutas del evaluador

router.post('/addEvaluator', evaluatorPersonController.createEvaluator); // Crea un nuevo evaluador.
router.put('/updateEvaluator/:id_persona', evaluatorPersonController.updateEvaluator); // Modifica los datos de un evaluador.
router.delete('/deleteEvaluator/:id_persona', evaluatorPersonController.deleteEvaluator); // Elimina un evaluador.



module.exports = router;