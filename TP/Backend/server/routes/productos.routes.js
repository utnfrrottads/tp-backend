const express = require("express");
const router = express.Router();
const controller = require("../controllers/productos.controller");

router.get("/", controller.getProductos);
router.get('/:id', controller.getProducto);
router.get('/rubro/:id_rubro', controller.getProductosByRubro);
router.get('/descripcion/:desc', controller.getProductosByDescripcion);
router.get('/empresas/:id_vendedor',controller.getProductosByEmpresa);
router.post('/', controller.createProducto);
router.put('/:id', controller.editProducto);
router.delete('/:id', controller.deleteProducto);

module.exports = router;
