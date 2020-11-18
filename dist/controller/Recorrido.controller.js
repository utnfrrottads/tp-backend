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
exports.deleteRecorrido = exports.updateRecorrido = exports.createRecorrido = exports.getRecorrido = exports.getRecorridos = void 0;
var typeorm_1 = require("typeorm");
var Recorrido_1 = require("../entity/Recorrido");
exports.getRecorridos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recorridos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).find()];
            case 1:
                recorridos = _a.sent();
                return [2 /*return*/, res.json(recorridos)];
        }
    });
}); };
exports.getRecorrido = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recorrido, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.createQueryBuilder("Recorrido")
                        .leftJoinAndSelect('Recorrido.lineaColectivo', 'LineaColectivo')
                        .where("Recorrido.IdRecorrido = :IdRecorrido", { IdRecorrido: req.params.IdRecorrido })
                        .getMany()];
            case 1:
                recorrido = _a.sent();
                if (recorrido) {
                    return [2 /*return*/, res.status(200).json(recorrido)];
                }
                else {
                    return [2 /*return*/, res.status(204).send({ Messsage: 'Recorrido not found' })];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('Error :' + error_1);
                return [2 /*return*/, res.status(400).send({ Messsage: 'Error al obtener el recorrido' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createRecorrido = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var nuevoRecorrido, recorrido, reco, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).find()];
            case 1:
                nuevoRecorrido = _a.sent();
                if (!(nuevoRecorrido !== undefined && nuevoRecorrido)) return [3 /*break*/, 4];
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).create(req.body)];
            case 2:
                recorrido = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).save(recorrido)];
            case 3:
                reco = _a.sent();
                return [2 /*return*/, res.status(200).json(reco)];
            case 4: return [2 /*return*/, res.status(204).send(nuevoRecorrido)];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                console.log('Error :' + error_2);
                return [2 /*return*/, res.status(400).send({ msj: 'Error al crear el recorrido' })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.updateRecorrido = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recorrido, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).findOne(req.params.IdRecorrido)];
            case 1:
                recorrido = _a.sent();
                if (!(recorrido !== undefined && recorrido)) return [3 /*break*/, 3];
                typeorm_1.getRepository(Recorrido_1.Recorrido).merge(recorrido, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).save(recorrido)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
            case 3: return [2 /*return*/, res.status(204).send({ Message: 'Recorrido not found' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log('Error :' + error_3);
                return [2 /*return*/, res.status(404).send({ Message: 'Error al actualizar el recorrido' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteRecorrido = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(Recorrido_1.Recorrido).delete(req.params.IdRecorrido)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.status(200).json(result)];
            case 2:
                error_4 = _a.sent();
                console.log('Error :' + error_4);
                return [2 /*return*/, res.status(400).send({ Message: 'Error al eliminar el recorrido' })];
            case 3: return [2 /*return*/];
        }
    });
}); };
