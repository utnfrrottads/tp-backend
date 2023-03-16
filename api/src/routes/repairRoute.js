const router = require('express').Router();
const repairController = require('../controllers/repairController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/repairValidator');


router.post('/', validateMissingValues, validateDataTypes, repairController.newRepair);

router.put('/editRepair/:repairId', validateMissingValues, validateDataTypes, repairController.editRepair);

router.get('/:repairId', repairController.getRepairById);


module.exports = router;