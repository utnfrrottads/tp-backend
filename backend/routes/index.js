const express = require('express');

const evaluadoresRoute = require('./evaluadores-route');
const candidatosRoute = require('./candidatos-route');
const vacantesRoute = require('./vacantes-route');
const evaluacionesRoute = require('./evaluaciones-route');
const entrevistasRoute = require('./entrevistas-route');
const empresasRoute = require('./empresas-route');

const router = express.Router();

router.use('/evaluadores', evaluadoresRoute);
router.use('/candidatos', candidatosRoute);
router.use('/vacantes', vacantesRoute);
router.use('/evaluaciones', evaluacionesRoute);
router.use('/entrevistas', entrevistasRoute);
router.use('/empresas', empresasRoute);


module.exports = router;