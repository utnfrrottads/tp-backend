'use strict'

const Supplier = require('../models/supplier-model');
const Article = require('../models/article-model');
const Supplier_Article = require('../models/supplier-article-model');
const connection = require('../database/db-connection');
const supplierController = { };

Supplier_Article.hasOne(Article, {foreignKey: 'id_articulo'});
Article.belongsTo(Supplier_Article, {foreignKey: 'id_articulo'});


 supplierController.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            where: {
                activo: 1
            },            
            rejectOnEmpty: true,
            include: Article, 
            required: true
        });
        res.json(suppliers);
    } catch (err) {
        res.json(err);
    }
}

supplierController.getOne = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if(supplier === null){
            res.json('This id doesn\'t belong to any supplier')
        }
        else{
            res.json(supplier);
        }
    } catch (err){
        res.json(err);
    }
}

supplierController.createSupplier = async (req, res) => {
    try {
        await Supplier.create({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        });
        res.json("Supplier created");
    } catch (err) {
        res.json(err);
    } 
}

supplierController.updateSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update({
            cuit: req.body.cuit,
            razon_social: req.body.razon_social,
            ciudad: req.body.ciudad,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }, {
            where: {
                id_proveedor: req.params.id
            }
        });
        if(rowsUpdated[0] === 0){
            res.json("Supplier update failed");
            }
            else {
                res.json("Supplier updated");
            }
    } catch (err) {
        res.json(err);
    }
}

supplierController.suspendSupplier = async (req, res) => {
    try {
        const rowsUpdated = await Supplier.update({
            activo: 0
        }, {
            where: { 
                id_proveedor: req.params.id 
            }
        });
        if(rowsUpdated[0] === 0){
            res.json("Supplier suspend failed");
            }
            else {
                res.json("Supplier suspended");
            }
    } catch (err) {
        res.json(err);
    }
}

supplierController.deleteSupplier = async (req, res) => {
    try {
        const rowsDeleted = await Supplier.destroy({
            where: {
                id_proveedor: req.params.id
            }
        });
        if(rowsDeleted === 0){
            res.json("This id doesn\'t belong to any supplier")
        }
        else {
            res.json("Supplier deleted")
        }
    } catch (err){
        res.json(err);
    }
}

supplierController.lastSupplierPurchaseByArticle = async (req, res) => {
    try {
        const query = 'call ultimoProveedorPorArticulo(?)';
        const results = await connection.query(query, {
            replacements: [req.params.id_articulo]
        });
        res.json(results);
    } catch (err) {
        res.json(err);
    }
}

module.exports = supplierController;