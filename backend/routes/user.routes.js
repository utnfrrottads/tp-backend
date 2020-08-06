/*
RUTA: http:localhost:0000/api/users
*/

const express = require ('express');
const router = express.Router();
const {check} = require ('express-validator')
const {validateFields} = require ('../middlewares/validateFields')
const userCtrl = require ('../controllers/user.controller');


router.get('/',[],userCtrl.getUsers);
router.get('/:id',[],userCtrl.getUser);
router.post('/',[check('name','Name field is required').not().isEmpty(),
                check('email','Email field is incorrect').isEmail(),
                check('password','Password field is required').not().isEmpty(),
                validateFields],userCtrl.createUser);
router.put('/:id',[check('name','Name field is required').not().isEmpty(),
                check('email','Email field is incorrect').isEmail(),
                validateFields],userCtrl.updateUser);
router.delete('/:id',[],userCtrl.deleteUser);


module.exports = router;