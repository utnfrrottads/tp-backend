const router = require('express').Router();
const entrevistasController = require('../controllers/entrevistas-controller');

router.post('/', async (req, res, next) => {
    try {
        let entrevistas = await entrevistasController.createEntrevista(req.body);
        res.status(201).json(entrevistas);
    } catch (error) {
        next(error);
    }
});

router.put('/:id_entrevista', async (req, res, next) => {
    try {
        let entrevista = await entrevistasController.updateEntrevista(req.params.id_entrevista, req.body);
        res.status(200).json(entrevista);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id_entrevista', async (req, res, next) => {
    try {
        await entrevistasController.deleteEntrevista(req.params.id_entrevista);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let entrevistas = await entrevistasController.getEntrevistas(req.query);
        res.status(200).json(entrevistas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id_entrevista', async (req, res, next) => {
    try {
        let entrevista = await entrevistasController.getEntrevista(req.params.id_entrevista);
        res.status(200).json(entrevista);
    } catch (error) {
        next(error);
    }
});

module.exports = router;