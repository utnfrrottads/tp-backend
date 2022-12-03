const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, shiftDateIsAfterToday, validateDateDataTypes } = require('../middlewares/validators/shiftValidator');
const { sanitizerDateParam } = require('../middlewares/sanitizers/shared/sharedSanitizers');

router.post('/', validateMissingValues, validateDataTypes, shiftDateIsAfterToday, shiftController.newShift);

router.put('/cancel/:shiftId', shiftController.cancelShift);

router.get('/shiftsbyDate', sanitizerDateParam, validateDateDataTypes, shiftController.getShiftsByDate);

router.get('/shiftsbyCustomer/:customerId', shiftController.getShiftsByCustomer);


module.exports = router;