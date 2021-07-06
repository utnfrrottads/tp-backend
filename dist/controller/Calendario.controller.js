"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCalendario = exports.updateCalendario = exports.createCalendario = exports.getCalendario = exports.getCalendarios = void 0;
var typeorm_1 = require("typeorm");
var Calendario_1 = require("../entity/Calendario");
exports.getCalendarios = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calendarios;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).find()];
            case 1:
                calendarios = _a.sent();
                return [2 /*return*/, res.json(calendarios)];
        }
    });
}); };
exports.getCalendario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calendario, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.createQueryBuilder('Calendario')
                        .leftJoinAndSelect('Calendario.recorrido', 'Recorrido')
                        .leftJoinAndSelect('Calendario.chofer', 'Chofer')
                        .where('Calendario.IdCalendario = :IdCalendario', { IdCalendario: req.params.IdCalendario })
                        .getOne()];
            case 1:
                calendario = _a.sent();
                if (calendario !== undefined) {
                    return [2 /*return*/, res.status(200).json(calendario)];
                }
                else {
                    return [2 /*return*/, res.status(204).json({ Message: 'Calendario not found' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.dir(error_1);
                return [2 /*return*/, res.status(400).json({ Message: 'Error al obtener el calendario' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCalendario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calendarioUso, calendario, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).find()];
            case 1:
                calendarioUso = _a.sent();
                if (!(calendarioUso.length === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).create(req.body)];
            case 2:
                calendario = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).save(calendario)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
            case 4: return [2 /*return*/, res.status(204).send({ Message: 'Error al crear el calendario' })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.dir(error_2);
                return [2 /*return*/, res.status(400).json({ message: 'Calendario en uso.' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateCalendario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calendario, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).findOne(req.params.idCalendario)];
            case 1:
                calendario = _a.sent();
                if (!(calendario !== undefined)) return [3 /*break*/, 3];
                typeorm_1.getRepository(Calendario_1.Calendario).merge(calendario, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).save(calendario)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3: return [2 /*return*/, res.status(204).send({ message: 'Calendario no existente' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.dir(error_3);
                return [2 /*return*/, res.status(400).send({ message: 'Calendario no existente' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteCalendario = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var calendario, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).findOne(req.params.idCalendario)];
            case 1:
                calendario = _a.sent();
                if (!(calendario !== undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, typeorm_1.getRepository(Calendario_1.Calendario).delete(calendario)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
            case 3: return [2 /*return*/, res.status(204).json({ message: 'No se pudo eliminar el Calendario en uso.' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                console.dir(error_4);
                return [2 /*return*/, res.status(400).json({ message: 'No se pudo eliminar el Calendario en uso.' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
