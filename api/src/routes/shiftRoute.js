const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, shiftDateIsAfterToday, validateDateDataType } = require('../middlewares/validators/shiftValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    shiftDateIsAfterToday, 
    shiftController.newShift
);

router.put('/cancel/:shiftId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    shiftController.cancelShift
);

router.get('/searchShifts', 
    checkAuth, 
    checkAuthRole(['admin']), 
    sanitizerQueryParams, 
    validateDateDataType, 
    shiftController.searchShifts
);


module.exports = router;