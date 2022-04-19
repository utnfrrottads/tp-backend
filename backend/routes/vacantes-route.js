const router = require('express').Router();
const vacantesController = require('../controllers/vacantes-controller');


router.post('/', async (req, res, next) => {
    try {
        const vacant = await vacantesController.createVacant(req.body);
        res.status(201).json(vacant);
    } catch (error) {
        next(error);
    }
});

router.put('/:id_vacante', async (req, res, next) => {
    try {
        await vacantesController.updateVacant(req.params.id_vacante, req.body);
        res.status(200).json('Vacant updated successfully');
    } catch (error) {
        next(error);
    }
});

router.delete('/:id_vacante', async (req, res, next) => {
    try {
        await vacantesController.deleteVacant(req.params.id_vacante);
        res.status(200).json('Vacant deleted successfully');
    } catch (error) {
        next(error);
    }
});

router.get('/:id_vacante', async (req, res, next) => {
    try {
        const vacant = await vacantesController.getOneVacant(req.params.id_vacante);
        res.status(200).json(vacant);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const vacants = await vacantesController.getAllVacants(req.query);
        res.status(200).json(vacants);
    } catch (error) {
        next(error);
    }
});

module.exports = router;