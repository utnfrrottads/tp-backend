const router = require('express').Router();
const personasController = require('../controllers/personas-controller');
const candidatosController = require('../controllers/candidatos-controller');

// Crear un nuevo candidato.
router.post('/', async (req, res, next) => {
    try {
        const candidate = await personasController.createPerson(req.body, 'candidato');
        res.status(200).json(candidate);
    } catch (error) {
        next(error);
    }
});


// Modificar los datos de un candidato.
router.put('/:id_persona', async (req, res, next) => {
    try {
        await personasController.updatePerson(req.params.id_persona, req.body, 'candidato');
        res.status(200).json('Candidate updated successfully');
    } catch (error) {
        next(error);
    }
});


// Eliminar un candidato.
router.delete('/:id_persona', async (req, res, next) => {
    try {
        await personasController.deletePerson(req.params.id_persona, 'candidato');
        res.status(200).json('Candidate deleted successfully');
    } catch (error) {
        next(error);
    }
});


// Devuelve todos los candidatos
router.get('/', async (req, res, next) => {
    try {
        const candidates = await candidatosController.getCandidatos();
        res.status(200).json(candidates);
    } catch (error) {
        next(error);
    }
});


// Devuelve un candidato y las entrevistas en la cuales participó
router.get('/:id_candidato', async (req, res, next) => {
    try {
        const candidate = await candidatosController.getCandidato(req.params.id_candidato);
        res.status(200).json(candidate);
    } catch (error) {
        next(error);
    }
});


module.exports = router;