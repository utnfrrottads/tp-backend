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
exports.deleteLineaColectivo = exports.updateLineaColectivo = exports.createLineaColectivo = exports.getLineaColectivo = exports.getLineaColectivos = void 0;
var typeorm_1 = require("typeorm");
var LineaColectivo_1 = require("../entity/LineaColectivo");
exports.getLineaColectivos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lineasCol, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).find()];
            case 1:
                lineasCol = _a.sent();
                if (lineasCol && lineasCol !== undefined) {
                    return [2 /*return*/, res.status(200).json(lineasCol)];
                }
                else {
                    return [2 /*return*/, res.status(204).send({ Message: 'Linea de colectivo not found' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(400).send({ Message: 'Hubo un error al obtener las lineas de colectivos' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getLineaColectivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lineaColEmpresa, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.createQueryBuilder('LineaColectivo')
                        .leftJoinAndSelect('LineaColectivo.empresa', 'Empresa')
                        .where('LineaColectivo.idLineaColectivo = :idLineaColectivo', { idLineaColectivo: req.params.id })
                        .getOne()];
            case 1:
                lineaColEmpresa = _a.sent();
                if (lineaColEmpresa != undefined && lineaColEmpresa) {
                    return [2 /*return*/, res.status(200).json(lineaColEmpresa)];
                }
                else {
                    return [2 /*return*/, res.status(204).send({ Message: 'Linea de colectivo not found' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(400).json({ Message: 'No existe o no se pudo obtener la Linea de colectivo' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createLineaColectivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lineaCol, lineaC, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).create(req.body)];
            case 1:
                lineaCol = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).save(lineaCol)];
            case 2:
                lineaC = _a.sent();
                if (lineaC !== undefined && lineaC) {
                    return [2 /*return*/, res.status(204).json(lineaC)];
                }
                else {
                    return [2 /*return*/, res.status(204).send({ Message: 'errro al crear la linea de colectivo' })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(404).send({ Message: error_3.message })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateLineaColectivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var lineaCol, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).findOne(req.params.idLineaColectivo)];
            case 1:
                lineaCol = _a.sent();
                if (!(lineaCol !== undefined && lineaCol)) return [3 /*break*/, 3];
                typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).merge(lineaCol, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).save(lineaCol)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3: return [2 /*return*/, res.status(404).send({ Message: 'Linea Colectivo not found' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                return [2 /*return*/, res.status(404).send({ Message: error_4.message })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteLineaColectivo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(LineaColectivo_1.LineaColectivo).delete(req.params.id)];
            case 1:
                result = _a.sent();
                if (result !== undefined && result) {
                    return [2 /*return*/, res.status(200).json({ Message: result })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({ Message: result })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(200).json({ msj: error_5 })];
            case 3: return [2 /*return*/];
        }
    });
}); };
