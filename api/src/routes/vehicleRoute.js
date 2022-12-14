const router = require('express').Router();
const vehicleController = require('../controllers/vehicleController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/vehicleValidator');
const { sanitizerToUpperCase, sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', sanitizerToUpperCase, validateMissingValues, validateDataTypes, vehicleController.newVehicle);

router.delete('/:vehicleId', vehicleController.deleteVehicle);

router.put('/:vehicleId', sanitizerToUpperCase, validateMissingValues, validateDataTypes, vehicleController.editVehicle);

router.get('/', sanitizerQueryParams, vehicleController.getVehicles);


module.exports = router;