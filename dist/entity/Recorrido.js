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
exports.Recorrido = void 0;
var typeorm_1 = require("typeorm");
var LineaColectivo_1 = require("./LineaColectivo");
var Calendario_1 = require("./Calendario");
var Parada_1 = require("./Parada");
var Recorrido = /** @class */ (function (_super) {
    __extends(Recorrido, _super);
    function Recorrido() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Recorrido.prototype, "IdRecorrido", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return LineaColectivo_1.LineaColectivo; }, function (LineaColectivo) { return LineaColectivo.idLineaColectivo; }, { nullable: false }),
        __metadata("design:type", LineaColectivo_1.LineaColectivo)
    ], Recorrido.prototype, "lineaColectivo", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Recorrido.prototype, "RecorridoDesde", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 50,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Recorrido.prototype, "RecorridoHasta", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Calendario_1.Calendario; }, function (calendario) { return calendario.recorrido; }),
        __metadata("design:type", Array)
    ], Recorrido.prototype, "calendario", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Parada_1.Parada; }, function (parada) { return parada.recorrido; }),
        __metadata("design:type", Array)
    ], Recorrido.prototype, "parada", void 0);
    Recorrido = __decorate([
        typeorm_1.Entity()
    ], Recorrido);
    return Recorrido;
}(typeorm_1.BaseEntity));
exports.Recorrido = Recorrido;
