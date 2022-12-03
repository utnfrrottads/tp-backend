const router = require('express').Router();
const mechanicController = require('../controllers/mechanicController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/mechanicValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', validateMissingValues, validateDataTypes, mechanicController.newMechanic);

router.delete('/:mechanicId', mechanicController.deleteMechanic);

router.put('/:mechanicId', validateMissingValues, validateDataTypes, mechanicController.editMechanic);

router.get('/', sanitizerQueryParams, mechanicController.getMechanics);

router.get('/:mechanicId', mechanicController.getMechanicById);


module.exports = router;