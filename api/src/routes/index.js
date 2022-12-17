const router = require('express').Router();
const customerRoute = require('../routes/customerRoute');
const mechanicRoute = require('../routes/mechanicRoute');
const sparePartRoute = require('../routes/sparePartRoute');
const shiftRoute = require('../routes/shiftRoute');
const vehicleRoute = require('../routes/vehicleRoute');
const repairRoute = require('../routes/repairRoute');


router.use('/customer', customerRoute);

router.use('/mechanic', mechanicRoute);

router.use('/sparePart', sparePartRoute);

router.use('/shift', shiftRoute);

router.use('/vehicle', vehicleRoute);

router.use('/repair', repairRoute);


module.exports = router;