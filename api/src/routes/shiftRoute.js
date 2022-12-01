const router = require('express').Router();
const shiftController = require('../controllers/shiftController');
const { validateMissingValues, validateDataTypes, dateIsAfterToday } = require('../middlewares/validators/shiftValidator');

router.post('/', validateMissingValues, validateDataTypes, dateIsAfterToday, shiftController.newShift);


module.exports = router;