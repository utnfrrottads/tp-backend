const router = require('express').Router();
const mechanicController = require('../controllers/mechanicController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/mechanic');


router.post('/', validateMissingValues, validateDataTypes, mechanicController.newMechanic);

router.delete('/:mechanicId', mechanicController.deleteMechanic);

router.put('/:mechanicId', validateMissingValues, validateDataTypes, mechanicController.editMechanic);

router.get('/', mechanicController.getMechanics);


module.exports = router;