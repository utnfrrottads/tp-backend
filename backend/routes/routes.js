const router = require('express').Router();
const { DataTypes } = require('sequelize');
const sequelize = require('../database/db-connection');
const Evaluator = require('../models/evaluadores_a_cargo')(sequelize, DataTypes);


// Rutas del evaluador
router.get('/evaluators', async (req, res) => {
        const evaluators = await Evaluator.findAll();
        res.json(evaluators);
});  // Esta ruta muestra todos los evaluadores.




module.exports = router;