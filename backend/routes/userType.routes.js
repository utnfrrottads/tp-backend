/*
RUTA: http:localhost:0000/api/users/types
*/
const express = require ('express');
const router = express.Router();
const {check} = require ('express-validator')

const userTypeCtrl = require ('../controllers/userType.controller');
const {validateFields} = require('../middlewares/validateFields');
const {validateJWT} = require('../middlewares/validateJWT');


router.get('/',[validateJWT],userTypeCtrl.getUserTypes);
router.get('/:id',[validateJWT],userTypeCtrl.getUserType);
router.post('/',[validateJWT,
                    check('description','Description field is required').not().isEmpty(),
                    validateFields],userTypeCtrl.createUserType);
router.put('/:id',[validateJWT,
                    check('description','Description field is required').not().isEmpty(),
                    validateFields],userTypeCtrl.updateUserType);
router.delete('/:id',[validateJWT],userTypeCtrl.deleteUserType);


module.exports = router;