const router = require('express').Router();
const vacantesController = require('../controllers/vacantes-controller');

// Crea una nueva vacante.
router.post('/', async (req, res) => {
    try {
        await vacantesController.createVacant(req.body);
        res.status(200).json('Vacant created successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Modifica los datos de la vacante.
router.put('/:id_vacante', async (req, res) => {
    try {
        await vacantesController.updateVacant(req.params.id_vacante, req.body);
        res.status(200).json('Vacant updated successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Elimina una vacante.
router.delete('/:id_vacante', async (req, res) => {
    try {
        await vacantesController.deleteVacant(req.params.id_vacante);
        res.status(200).json('Vacant deleted successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Devuelve los datos de la vacante seleccionada.
router.get('/:id_vacante', async (req, res) => {
    try {
        const vacant = await vacantesController.getOneVacant(req.params.id_vacante);
        res.status(200).json( vacant );
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Devuelve todas las vacantes de una empresa.
router.get('/', async (req, res) => {
    try {
        const vacants = await vacantesController.getAllVacantsByCompany();
        res.status(200).json( vacants );
    } catch (error) {
        res.status(400).json( error.message );
    }
});

module.exports = router;