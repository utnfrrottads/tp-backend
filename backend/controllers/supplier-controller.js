'use strict'

const Supplier = require('../models/supplier-model');
const Article = require('../models/article-model');
const connection = require('../database/db-connection');
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

supplierController.suppliersByArticle = async (req, res) => {
    try {
        /* const article =  await Article.findOne({
            where: {
                id_articulo: req.params.id_articulo
            }
        });
        const suppliers = await article.getProveedores({
            attributes: [sequelize.fn('max', sequelize.col('fecha_compra')), 'id_proveedor'], 
        }, {
            group: 'id_proveedor'
        }); */
        const query = 'DROP TEMPORARY TABLE IF EXISTS ult_proveedor \
        CREATE TEMPORARY TABLE ult_proveedor; \
        SELECT id_proveedor, id_articulo, max(fecha_compra) AS ultima_fecha \
        FROM proveedores_articulos \
        GROUP BY id_proveedor, id_articulo;\
        SELECT p.id_proveedor, pa.id_articulo, p.cuit, p.razon_social, \
        a.descripcion, a.precio, a.stock, p.cuit, pa.fecha_compra, pa.precio_unitario, pa.cantidad \
        FROM proveedores_articulos pa \
        INNER JOIN ult_proveedor up \
            ON pa.id_proveedor = up.id_proveedor \
            AND pa.id_articulo = up.id_articulo \
            AND pa.fecha_compra = up.ultima_fecha \
        INNER JOIN proveedores p \
            ON p.id_proveedor = pa.id_proveedor \
        INNER JOIN articulos a \
            ON a.id_articulo = pa.id_articulo \
            WHERE a.id_articulo = 1';

        const [results, metadata] = await connection.query(query);
        res.json(results);
    } catch (err) {
        console.log(err);
    }
}

module.exports = supplierController;