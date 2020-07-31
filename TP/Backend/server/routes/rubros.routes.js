const express = require("express");
const router = express.Router();

const controller = require("../controllers/rubros.controller");

router.get("/", controller.getRubros);
router.get('/:id', controller.getRubro);
router.post('/', controller.createRubro);
router.put('/:id', controller.editRubro);
router.delete('/:id', controller.deleteRubro);


module.exports = router;
