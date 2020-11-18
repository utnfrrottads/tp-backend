"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var Calendario_controller_1 = require("../controller/Calendario.controller");
router.get('/Calendario', Calendario_controller_1.getCalendarios);
router.get('/Calendario/:IdCalendario', Calendario_controller_1.getCalendario);
router.put('/Calendario', Calendario_controller_1.updateCalendario);
router.post('/Calendario', Calendario_controller_1.createCalendario);
router.delete('/Calendario', Calendario_controller_1.deleteCalendario);
exports.default = router;
