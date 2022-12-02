const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, shiftDateIsAfterToday } = require('../middlewares/validators/shiftValidator');

router.post('/', validateMissingValues, validateDataTypes, shiftDateIsAfterToday, shiftController.newShift);

router.put('/cancel/:shiftId', shiftController.cancelShift);


module.exports = router;