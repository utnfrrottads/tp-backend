const router = require('express').Router();

const evaluatorPersonController = require('../controllers/evaluatorPerson-controller');


// Rutas del evaluador

router.post('/addEvaluator', evaluatorPersonController.createEvaluator); // Crea un nuevo evaluador.

router.get('/evaluators', evaluatorPersonController.getAllEvaluators);  // Muestra todos los evaluadores.





module.exports = router;