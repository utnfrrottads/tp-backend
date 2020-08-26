const express = require("express");
const router = express.Router();
const controller = require("../controllers/productos.controller");

router.get("/", controller.getProductos);
router.get('/:id', controller.getProducto);
router.post('/', controller.createProducto);
router.put('/:id', controller.editProducto);
router.delete('/:id', controller.deleteProducto);

module.exports = router;
