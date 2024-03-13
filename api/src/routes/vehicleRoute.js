const router = require('express').Router();
const vehicleController = require('../controllers/vehicleController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/vehicleValidator');
const { sanitizerToUpperCase, sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    sanitizerToUpperCase, 
    validateMissingValues, 
    validateDataTypes, 
    vehicleController.newVehicle
);

router.delete('/:vehicleId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    vehicleController.deleteVehicle
);

router.put('/:vehicleId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    sanitizerToUpperCase, 
    validateMissingValues, 
    validateDataTypes, 
    vehicleController.editVehicle
);

router.get('/', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    vehicleController.getVehicles
);

router.get('/:vehicleId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    vehicleController.getVehicleById
);

router.get('/vehiclesFromCustomer/:customerId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    vehicleController.getVehiclesFromCustomer
);


module.exports = router;