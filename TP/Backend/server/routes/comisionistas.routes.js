const express = require("express");
const router = express.Router();
const controller = require("../controllers/comisionistas.controller");

router.get("/", controller.getComisionistas);
router.get('/:id', controller.getComisionista);
router.post('/', controller.createComisionista);
router.put('/:id', controller.editComisionista);
router.delete('/:id', controller.deleteComisionista);


module.exports = router;