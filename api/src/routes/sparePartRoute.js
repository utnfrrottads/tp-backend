const router = require('express').Router();
const sparePartController = require('../controllers/sparePartController');
const { validateMissingValues, validateDataTypes } = require('../middlewares/validators/sparePartValidator');


router.post('/', validateMissingValues, validateDataTypes, sparePartController.newSpare);

router.delete('/:sparePartId', sparePartController.deleteSparePart);

router.put('/:sparePartId', validateMissingValues, validateDataTypes, sparePartController.editSparePart);


module.exports = router;