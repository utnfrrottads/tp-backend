const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, shiftDateIsAfterToday, validateDateDataType } = require('../middlewares/validators/shiftValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');

router.post('/', validateMissingValues, validateDataTypes, shiftDateIsAfterToday, shiftController.newShift);

router.put('/cancel/:shiftId', shiftController.cancelShift);

router.get('/searchShifts', sanitizerQueryParams, validateDateDataType, shiftController.searchShifts);

module.exports = router;