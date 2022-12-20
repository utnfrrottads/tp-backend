const router = require('express').Router();
const repairController = require('../controllers/repairController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/repairValidator');


router.post('/', validateMissingValues, validateDataTypes, repairController.newRepair);

router.put('/editEnteredRepair/:repairId', validateMissingValues, validateDataTypes, repairController.editEnteredRepair);

router.get('/:repairId', repairController.getRepairById);


module.exports = router;