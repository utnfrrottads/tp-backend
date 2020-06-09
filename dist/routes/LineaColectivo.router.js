"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var LineaColectivo_controller_1 = require("../controller/LineaColectivo.controller");
router.get('./LineaColectivo', LineaColectivo_controller_1.getLineaColectivos);
router.get('./LineaColectivo/:id', LineaColectivo_controller_1.getLineaColectivo);
router.post('./LineaColectivo', LineaColectivo_controller_1.createLineaColectivo);
router.put('./LineaColectivo', LineaColectivo_controller_1.updateLineaColectivo);
router.delete('./LineaColectivo', LineaColectivo_controller_1.deleteLineaColectivo);
exports.default = router;
