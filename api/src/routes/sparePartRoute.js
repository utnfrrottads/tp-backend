const router = require('express').Router();
const sparePartController = require('../controllers/sparePartController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/sparePartValidator');
const { sanitizerQueryParams } = require('../middlewares/sanitizers/shared/sharedSanitizers');


router.post('/', validateMissingValues, validateDataTypes, sparePartController.newSparePart);

router.delete('/:sparePartId', sparePartController.deleteSparePart);

router.put('/:sparePartId', validateMissingValues, validateDataTypes, sparePartController.editSparePart);

router.get('/', sanitizerQueryParams, sparePartController.getSpareParts);

router.get('/:sparePartId', sparePartController.getSparePartById);


module.exports = router;