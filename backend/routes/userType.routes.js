/*
RUTA: http:localhost:0000/api/users/types
*/
const express = require ('express');
const router = express.Router();
const {check} = require ('express-validator')

const userTypeCtrl = require ('../controllers/userType.controller');
const {validateFields} = require('../middlewares/validateFields');


router.get('/',[],userTypeCtrl.getUserTypes);
router.get('/:id',[],userTypeCtrl.getUserType);
router.post('/',[check('description','Description field is required').not().isEmpty(),
                    validateFields],userTypeCtrl.createUserType);
router.put('/:id',[check('description','Description field is required').not().isEmpty(),
                    validateFields],userTypeCtrl.updateUserType);
router.delete('/:id',[],userTypeCtrl.deleteUserType);


module.exports = router;