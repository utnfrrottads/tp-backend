const express = require("express");
const router = express.Router();
const controller = require("../controllers/ventas.controller");


router.get("/", controller.getVentas);
router.get('/vendedor/:id', controller.getVentasByVendedor);
router.get('/comprador/:id', controller.getVentasByComprador);
router.get('/:id', controller.getVenta);
router.post('/', controller.createVenta);
router.put('/:id', controller.editVenta);
router.delete('/:id', controller.deleteVenta);


module.exports = router;
