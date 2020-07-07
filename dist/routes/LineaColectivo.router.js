"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var LineaColectivo_controller_1 = require("../controller/LineaColectivo.controller");
router.get('/getLineaColectivos', LineaColectivo_controller_1.getLineaColectivos);
router.get('/getLineaColectivo/:id', LineaColectivo_controller_1.getLineaColectivo);
router.post('/createLineaColectivo', LineaColectivo_controller_1.createLineaColectivo);
router.put('/updateLineaColectivo', LineaColectivo_controller_1.updateLineaColectivo);
router.delete('/deleteLineaColectivo/:id', LineaColectivo_controller_1.deleteLineaColectivo);
exports.default = router;
