const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, shiftDateIsAfterToday, validateDateDataType } = require('../middlewares/validators/shiftValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');

router.post('/', validateMissingValues, validateDataTypes, shiftDateIsAfterToday, shiftController.newShift);

router.put('/cancel/:shiftId', shiftController.cancelShift);

router.get('/shiftsbyDate', sanitizerQueryParams, validateDateDataType, shiftController.getShiftsByDate);

router.get('/shiftsbyCustomer/:customerId', shiftController.getShiftsByCustomer);


module.exports = router;