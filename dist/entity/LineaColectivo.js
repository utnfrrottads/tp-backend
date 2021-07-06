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
exports.LineaColectivo = void 0;
var typeorm_1 = require("typeorm");
var Empresa_1 = require("./Empresa");
var Chofer_1 = require("./Chofer");
var Recorrido_1 = require("./Recorrido");
var LineaColectivo = /** @class */ (function (_super) {
    __extends(LineaColectivo, _super);
    function LineaColectivo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], LineaColectivo.prototype, "idLineaColectivo", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Empresa_1.Empresa; }, function (Empresa) { return Empresa.Cuit; }, { nullable: false }),
        __metadata("design:type", Empresa_1.Empresa)
    ], LineaColectivo.prototype, "empresa", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'varchar',
            length: 100,
            nullable: false,
            unique: true
        }),
        __metadata("design:type", String)
    ], LineaColectivo.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'double',
            nullable: false,
        }),
        __metadata("design:type", Number)
    ], LineaColectivo.prototype, "latitud", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'double',
            nullable: false,
        }),
        __metadata("design:type", Number)
    ], LineaColectivo.prototype, "longitud", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Chofer_1.Chofer; }, function (chofer) { return chofer.lineaColectivo; }),
        __metadata("design:type", Array)
    ], LineaColectivo.prototype, "chofer", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Recorrido_1.Recorrido; }, function (recorrido) { return recorrido.lineaColectivo; }),
        __metadata("design:type", Array)
    ], LineaColectivo.prototype, "recorrido", void 0);
    LineaColectivo = __decorate([
        typeorm_1.Entity()
    ], LineaColectivo);
    return LineaColectivo;
}(typeorm_1.BaseEntity));
exports.LineaColectivo = LineaColectivo;
