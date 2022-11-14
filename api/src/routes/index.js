const router = require('express').Router();
const clientRoute = require('../routes/clientRoute');
const mechanicRoute = require('../routes/mechanicRoute');
const spareRoute = require('../routes/spareRoute');


router.use('/client', clientRoute);

router.use('/mechanic', mechanicRoute);

router.use('/spare', spareRoute);


module.exports = router;