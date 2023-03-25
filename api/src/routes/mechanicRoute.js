const router = require('express').Router();
const mechanicController = require('../controllers/mechanicController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/mechanicValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    mechanicController.newMechanic
);

router.delete('/:mechanicId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    mechanicController.deleteMechanic
);

router.put('/:mechanicId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    mechanicController.editMechanic
);

router.get('/', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    mechanicController.getMechanics
);

router.get('/:mechanicId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    mechanicController.getMechanicById
);


module.exports = router;