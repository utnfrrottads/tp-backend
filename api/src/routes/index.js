const router = require('express').Router();
const clientRoute = require('../routes/clientRoute');


router.use('/client', clientRoute);


module.exports = router;