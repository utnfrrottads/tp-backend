const router = require('express').Router();
const vehicleController = require('../controllers/vehicleController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/vehicleValidator');
const { sanitizerToUpperCase } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', sanitizerToUpperCase, validateMissingValues, validateDataTypes, vehicleController.newVehicle);


module.exports = router;