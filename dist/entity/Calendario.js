"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendario = void 0;
var typeorm_1 = require("typeorm");
var Chofer_1 = require("./Chofer");
var Recorrido_1 = require("./Recorrido");
var Calendario = /** @class */ (function (_super) {
    __extends(Calendario, _super);
    function Calendario() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Calendario.prototype, "IdCalendario", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Recorrido_1.Recorrido; }, function (recorrido) { return recorrido.IdRecorrido; }),
        __metadata("design:type", Recorrido_1.Recorrido)
    ], Calendario.prototype, "recorrido", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Chofer_1.Chofer; }, function (chofer) { return chofer.Cuil; }),
        __metadata("design:type", Chofer_1.Chofer)
    ], Calendario.prototype, "chofer", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'time',
            default: null
        }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], Calendario.prototype, "HoraLlegada", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'time',
            default: null
        }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], Calendario.prototype, "HoraSalida", void 0);
    Calendario = __decorate([
        typeorm_1.Entity()
    ], Calendario);
    return Calendario;
}(typeorm_1.BaseEntity));
exports.Calendario = Calendario;
