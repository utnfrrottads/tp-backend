const router = require('express').Router();

const evaluatorPersonController = require('../controllers/evaluatorPerson-controller');
const vacantController = require('../controllers/vacant-controller');


router.get('/', (req, res) => {
    res.send('Home!');
});


// Rutas del evaluador

router.post('/addEvaluator', evaluatorPersonController.createEvaluator); // Crea un nuevo evaluador.
router.put('/updateEvaluator/:id_persona', evaluatorPersonController.updateEvaluator); // Modifica los datos de un evaluador.
router.delete('/deleteEvaluator/:id_persona', evaluatorPersonController.deleteEvaluator); // Elimina un evaluador.


// Rutas de la vacante

router.get('/vacants', vacantController.getAllVacantsByCompany); // Trae todas las vacantes de una empresa.
router.get('/vacant/:id_vacante', vacantController.getOneVacant); // Trae los datos de la vacante seleccionada.
router.post('/addVacant', vacantController.createVacant); // Crea una nueva vacante.
router.put('/updateVacant/:id_vacante', vacantController.updateVacant); // Modifica los datos de la vacante.
router.delete('/deleteVacant/:id_vacante', vacantController.deleteVacant) // Elimina una vacante.

module.exports = router;