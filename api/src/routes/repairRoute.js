const router = require('express').Router();
const repairController = require('../controllers/repairController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/repairValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    repairController.newRepair
);

router.delete('/:repairId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    repairController.deleteRepair
);

router.put('/editRepair/:repairId', 
    checkAuth, 
    checkAuthRole(['mechanic']), 
    validateMissingValues, 
    validateDataTypes, 
    repairController.editRepair
);

router.put('/assignMechanic/:repairId/:mechanicId', 
    checkAuth, 
    checkAuthRole(['mechanic']), 
    repairController.assignMechanicToRepair
);

router.put('/markAsCompleted/:repairId/:mechanicId', 
    checkAuth, 
    checkAuthRole(['mechanic']), 
    repairController.markRepairAsCompleted
);

router.put('/markAsDelivered/:repairId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    repairController.markRepairAsDelivered
);

router.get('/', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    repairController.getRepairs
);

router.get('/takenByMechanic/:mechanicId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    repairController.getRepairsTakenByMechanic
);

router.get('/:repairId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    repairController.getRepairById
);


module.exports = router;