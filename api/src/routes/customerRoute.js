const router = require('express').Router();
const customerController = require('../controllers/customerController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/customerValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', validateMissingValues, validateDataTypes, customerController.newCustomer);

router.delete('/:customerId', customerController.deleteCustomer);

router.put('/:customerId', validateMissingValues, validateDataTypes, customerController.editCustomer);

router.get('/', sanitizerQueryParams, customerController.getCustomers);

router.get('/:customerId', customerController.getCustomerById);


module.exports = router;