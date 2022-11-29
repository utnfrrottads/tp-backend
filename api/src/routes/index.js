const router = require('express').Router();
const customerRoute = require('../routes/customerRoute');
const mechanicRoute = require('../routes/mechanicRoute');
const sparePartRoute = require('../routes/sparePartRoute');


router.use('/customer', customerRoute);

router.use('/mechanic', mechanicRoute);

router.use('/sparePart', sparePartRoute);


module.exports = router;