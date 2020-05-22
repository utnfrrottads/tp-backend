'use strict'

const Supplier = require('../models/supplier-model');
const Article = require('../models/article-model');
const supplierController = { };


 supplierController.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({
            where: {
                activo: 1
            },
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
        res.json(supplier);
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
        res.json("Article updated");
    } catch (err) {
        res.json(err);
    } 
}

supplierController.updateSupplier = async (req, res) => {
    try {
        await Supplier.update({
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
        res.json("Supplier created");
    } catch (err) {
        res.json(err);
    }
}

supplierController.deleteSupplier = async (req, res) => {
    try {
        await Supplier.destroy({
            where: {
                id_proveedor: req.params.id
            }
        });
        res.json("Supplier deleted");
    } catch (err){
        res.json(err);
    }
}

supplierController.suspendSupplier = async (req, res) => {
    try {
        await Supplier.update({
            activo: 0
        }, {
            where: { 
                id_proveedor: req.params.id 
            }
        });
        res.json("Supplier suspended");
    } catch (err) {
        res.json(err);
    }
}

module.exports = supplierController;