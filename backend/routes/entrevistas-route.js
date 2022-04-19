const router = require('express').Router();
const entrevistasController = require('../controllers/entrevistas-controller');

router.post('/', async (req, res, next) => {
    try {
        const interview = await entrevistasController.createEntrevista(req.body);
        res.status(201).json(interview);
    } catch (error) {
        next(error);
    }
});

router.put('/:id_entrevista', async (req, res, next) => {
    try {
        await entrevistasController.updateEntrevista(req.params.id_entrevista, req.body);
        res.status(200).json('Interview updated successfully');
    } catch (error) {
        next(error);
    }
});

router.delete('/:id_entrevista', async (req, res, next) => {
    try {
        await entrevistasController.deleteEntrevista(req.params.id_entrevista);
        res.status(200).json('Interview deleted successfully');
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const interviews = await entrevistasController.getEntrevistas(req.query);
        res.status(200).json(interviews);
    } catch (error) {
        next(error);
    }
});

router.get('/:id_entrevista', async (req, res, next) => {
    try {
        const interview = await entrevistasController.getEntrevista(req.params.id_entrevista);
        res.status(200).json(interview);
    } catch (error) {
        next(error);
    }
});

module.exports = router;