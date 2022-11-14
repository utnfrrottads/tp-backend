const router = require('express').Router();
const spareController = require('../controllers/spareController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/spare');


router.post('/', validateMissingValues, validateDataTypes, spareController.newSpare);


module.exports = router;