const router = require('express').Router();
const sparePartController = require('../controllers/sparePartController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/sparePartValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');
const { checkAuth, checkAuthRole } = require('../middlewares/auth');


router.post('/', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    sparePartController.newSparePart
);

router.delete('/:sparePartId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    sparePartController.deleteSparePart
);

router.put('/:sparePartId', 
    checkAuth, 
    checkAuthRole(['admin']), 
    validateMissingValues, 
    validateDataTypes, 
    sparePartController.editSparePart
);

router.get('/', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sanitizerQueryParams, 
    sparePartController.getSpareParts
);

router.get('/:sparePartId', 
    checkAuth, 
    checkAuthRole(['admin', 'mechanic']), 
    sparePartController.getSparePartById
);


module.exports = router;