const router = require('express').Router();
const clientController = require('../controllers/clientController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/client');


router.post('/', validateMissingValues, validateDataTypes, clientController.newClient);

router.delete('/:clientId', clientController.deleteClient);

router.put('/:clientId', validateMissingValues, validateDataTypes, clientController.editClient);


module.exports = router;