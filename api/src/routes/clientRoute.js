const router = require('express').Router();
const clientController = require('../controllers/clientController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/client');
const { sanitizerQueryParam } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', validateMissingValues, validateDataTypes, clientController.newClient);

router.delete('/:clientId', clientController.deleteClient);

router.put('/:clientId', validateMissingValues, validateDataTypes, clientController.editClient);

router.get('/', sanitizerQueryParam, clientController.getClients);

router.get('/:clientId', clientController.getClientById);


module.exports = router;