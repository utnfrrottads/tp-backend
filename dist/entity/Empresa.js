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
exports.Empresa = void 0;
var typeorm_1 = require("typeorm");
var LineaColectivo_1 = require("./LineaColectivo");
var Empresa = /** @class */ (function (_super) {
    __extends(Empresa, _super);
    function Empresa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: "bigint",
            unique: true,
            nullable: false }),
        __metadata("design:type", Number)
    ], Empresa.prototype, "Cuit", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 200,
            unique: true,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "RazonSocial", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "Provincia", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "Localidad", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "Domicilio", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "Telefono", void 0);
    __decorate([
        typeorm_1.Column({
            type: "varchar",
            length: 100,
            nullable: false
        }),
        __metadata("design:type", String)
    ], Empresa.prototype, "Email", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return LineaColectivo_1.LineaColectivo; }, function (lineaC) { return lineaC.empresa; }),
        __metadata("design:type", Array)
    ], Empresa.prototype, "lineaC", void 0);
    Empresa = __decorate([
        typeorm_1.Entity()
    ], Empresa);
    return Empresa;
}(typeorm_1.BaseEntity));
exports.Empresa = Empresa;
