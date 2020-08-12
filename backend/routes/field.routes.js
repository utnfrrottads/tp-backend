/*
RUTA: http:localhost:0000/api/fields'
*/
const express = require('express');
const router = express.Router();
const {check} = require ('express-validator')
const { validateFields } = require('../middlewares/validateFields');

const fieldCtrl = require('../controllers/field.controller');
const {validateJWT} = require('../middlewares/validateJWT');

router.get('/',[validateJWT],fieldCtrl.getFields)
router.get('/:id',[validateJWT],fieldCtrl.getField)
router.get('/search/:search',[validateJWT],fieldCtrl.getFieldsByParams)
router.post('/',[validateJWT,
                    check('name','Name field is required').not().isEmpty(),
                    check('price','Price field is required').not().isEmpty(),
                    check('cantMaxPlayers','Quantity field is required').not().isEmpty(),
                    check('openingHour','OpeningHour field is required').not().isEmpty(),
                    check('closingHour','ClosingHour field is required').not().isEmpty(),
                    validateFields],fieldCtrl.createField)
router.put('/:id',[validateJWT,
                    check('name','Name field is required').not().isEmpty(),
                    check('price','Price field is required').not().isEmpty(),
                    check('cantMaxPlayers','Quantity field is required').not().isEmpty(),
                    check('openingHour','OpeningHour field is required').not().isEmpty(),
                    check('closingHour','ClosingHour field is required').not().isEmpty(),
                    validateFields],fieldCtrl.updateField)
router.delete('/:id',[validateJWT],fieldCtrl.deleteField)




module.exports = router;