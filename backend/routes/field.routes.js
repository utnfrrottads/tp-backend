/*
RUTA: http:localhost:0000/api/fields'
*/
const express = require('express');
const router = express.Router();
const {check} = require ('express-validator')
const { validateFields } = require('../middlewares/validateFields');

const fieldCtrl = require('../controllers/field.controller');

router.get('/',[],fieldCtrl.getFields)
router.get('/:id',[],fieldCtrl.getField)
router.post('/',[check('name','Name field is required').not().isEmpty(),
                    check('price','Price field is required').not().isEmpty(),
                    check('cantMaxPlayers','Quantity field is required').not().isEmpty(),
                    check('openingHour','OpeningHour field is required').not().isEmpty(),
                    check('closingHour','ClosingHour field is required').not().isEmpty(),
                    validateFields],fieldCtrl.createField)
router.put('/:id',[check('name','Name field is required').not().isEmpty(),
                    check('price','Price field is required').not().isEmpty(),
                    check('cantMaxPlayers','Quantity field is required').not().isEmpty(),
                    check('openingHour','OpeningHour field is required').not().isEmpty(),
                    check('closingHour','ClosingHour field is required').not().isEmpty(),
                    validateFields],fieldCtrl.updateField)
router.delete('/:id',[],fieldCtrl.deleteField)




module.exports = router;