const router = require('express').Router();
const authController = require('../controllers/authController');
const { validateMissingValues } = require('../middlewares/validators/authValidator');


router.post('/login', validateMissingValues, authController.login);


module.exports = router;