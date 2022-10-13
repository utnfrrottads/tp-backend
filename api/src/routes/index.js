const router = require('express').Router();
const clientRoute = require('../routes/clientRoute');
const mechanicRoute = require('../routes/mechanicRoute');


router.use('/client', clientRoute);

router.use('/mechanic', mechanicRoute);


module.exports = router;