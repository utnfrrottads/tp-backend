const router = require('express').Router();
const clientRoute = require('../routes/clientRoute');
const mechanicRoute = require('../routes/mechanicRoute');
const sparePartRoute = require('../routes/sparePartRoute');


router.use('/client', clientRoute);

router.use('/mechanic', mechanicRoute);

router.use('/sparePart', sparePartRoute);


module.exports = router;