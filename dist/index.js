"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var Empresa_route_1 = __importDefault(require("./routes/Empresa.route"));
var LineaColectivo_router_1 = __importDefault(require("./routes/LineaColectivo.router"));
var Chofer_route_1 = __importDefault(require("./routes/Chofer.route"));
var app = express_1.default();
typeorm_1.createConnection();
//middlewars
app.use(cors_1.default());
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
// routes
app.use(Empresa_route_1.default, function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: err });
});
app.use(LineaColectivo_router_1.default);
app.use(Chofer_route_1.default, function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render('error', { error: 'Error no identificado' });
});
app.listen(3000);
console.log('Server on port', 3000);
