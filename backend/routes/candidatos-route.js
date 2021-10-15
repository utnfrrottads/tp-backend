const router = require('express').Router();
const personasController = require('../controllers/personas-controller');
const candidatosController = require('../controllers/candidatos-controller');

// Crear un nuevo candidato.
router.post('/', async (req, res) => {
    try {
        await personasController.createPerson(req.body, 'candidato');
        res.status(200).json('Candidate created successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Modificar los datos de un candidato.
router.put('/:id_persona', async (req, res) => {
    try {
        await personasController.updatePerson(req.params.id_persona, req.body, 'candidato');
        res.status(200).json('Candidate updated successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Eliminar un candidato.
router.delete('/:id_persona', async (req, res) => {
    try {
        await personasController.deletePerson(req.params.id_persona, 'candidato');
        res.status(200).json('Candidate deleted successfully');
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Devuelve todos los candidatos
router.get('/', async (req, res) => {
    try {
        const candidates = await candidatosController.getCandidatos();
        res.status(200).json(candidates);
    } catch (error) {
        res.status(400).json( error.message );
    }
});


// Devuelve un candidato y las entrevistas en la cuales participó
router.get('/:id_candidato', async (req, res) => {
    try {
        const candidato = await candidatosController.getCandidato(req.params.id_candidato);
        res.status(200).json(candidato);
    } catch (error) {
        res.status(400).json( error.message );
    }
});


module.exports = router;