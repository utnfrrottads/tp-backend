const router = require('express').Router();
const vacantController = require('../controllers/vacant-controller');

// Rutas de la vacante

router.get('/', vacantController.getAllVacantsByCompany); // Trae todas las vacantes de una empresa.
router.get('/:id_vacante', vacantController.getOneVacant); // Trae los datos de la vacante seleccionada.
router.post('/', vacantController.createVacant); // Crea una nueva vacante.
router.put('/:id_vacante', vacantController.updateVacant); // Modifica los datos de la vacante.
router.delete('/:id_vacante', vacantController.deleteVacant) // Elimina una vacante.

module.exports = router;