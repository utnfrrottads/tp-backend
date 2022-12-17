const router = require('express').Router();
const repairController = require('../controllers/repairController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/repairValidator');


router.post('/', validateMissingValues, validateDataTypes, repairController.newRepair);


module.exports = router;