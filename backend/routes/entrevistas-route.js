const router = require('express').Router();
const entrevistasController = require('../controllers/entrevistas-controller');

router.post('/', async (req, res) => {
    try {
        await entrevistasController.createEntrevista(req.body);
        res.status(200).json('Entrevista created successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});



router.put('/:id_entrevista', async (req, res) => {
    try {
        await entrevistasController.updateEntrevista(req.params.id_entrevista, req.body);
        res.status(200).json('Entrevista updated successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});



router.delete('/:id_entrevista', async (req, res) => {
    try {
        await entrevistasController.deleteEntrevista(req.params.id_entrevista);
        res.status(200).json('Entrevista deleted successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});

// Devuelve todas las entrevistas
router.get('/', async (req, res) => {
    try {
        const entrevistas = await entrevistasController.getEntrevistas();
        res.status(200).json( entrevistas );
    } catch (error) {
        res.status(400).json( error.message );
    }
});

router.get('/:id_entrevista', async (req, res) => {
    try {
        const entrevista = await entrevistasController.getEntrevista(req.params.id_entrevista);
        res.status(200).json( entrevista );
    } catch (error) {
        res.status(400).json( error.message );
    }
});

module.exports = router;