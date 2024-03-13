const router = require('express').Router();
const customerController = require('../controllers/customerController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/customerValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    customerController.newCustomer
);

router.delete('/:customerId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    customerController.deleteCustomer
);

router.put('/:customerId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    customerController.editCustomer
);

router.get('/', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    customerController.getCustomers
);

router.get('/:customerId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    customerController.getCustomerById
);


module.exports = router;