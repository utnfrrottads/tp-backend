//Metodos a la BD aqui
const Sale = require('../models/sale');
const User = require('../models/user');
const Product = require('../models/product');
const Article = require('../models/article');
const ObjectId = require('mongodb').ObjectID;
const ApiError = require('../error/ApiError');
const { findById } = require('../models/sale');

const saleCtrl = {};

saleCtrl.updateStock = async(cart, mode) => {
    cart.forEach(item => {
        let product = Product.findById(item.product);
        switch (mode) {
            case "new":
                product.stock = product.stock - item.quantity;
                break;
            case "delete":
                product.stock = product.stock + item.quantity;
                break;
        }
    });
}

saleCtrl.checkProductAndStock = async(cart) => {
    let msg;
    cart.forEach(product => {
        let p = Product.findById(product.product)
        if(p.length > 0){
            if(p.stock < product.quantity){
                let article = Article.findById(p.article);
                msg = "El producto "+article.name+" no tiene stock suficiente";
                break;
            }
        } else {
            let article = Article.findById(p.article);
            msg = "No se encontro el producto "+article.name;
            break
        }
    });
    if(msg != null){
        throw ApiError.badRequest(msg);
    }
}

saleCtrl.checkClient = async(clientID) => {
    let user = User.find({_id: clientID, client:true});
    if(!(user.length>0)){
        throw ApiError.badRequest('El cliente seleccionado no existe');
    }
}

//M�todo obtener todas las ventas
saleCtrl.getSales = async (req, res, next) => {
    try {
        const sales = await Sale.find();
        res.json(sales);
    } catch(err){
        next(err);
    }
}

//M�todo obtener una venta
saleCtrl.getSale = async (req, res, next) => {
    try{
        const {id} = req.params; //Consigo el ID mando por parametro en el get
    
        const sale = await Sale.findById(id);
        res.json(sale);
    } catch{
        next(err);
    }
}

//M�todo crear venta
saleCtrl.createSale = async (req, res, next) => {
    try{
        let validations = true;
        const sale = new Sale(req.body);
        await saleCtrl.checkClient(sale.client).catch((err) => {
            next(err);
            validations = false;
        })
        await saleCrtl.checkClient(sale.client).catch((err) => {
            next(err);
            validations = false;
        })
        await saleCtrl.checkProductAndStock(sale.cart).catch((err) => {
            next(err);
            validations = false;
        })
        if(validations){
            await sale.save();
            await saleCtrl.updateStock(sale.cart, "new");
            res.json({ status: 'Venta creada' });
        }
    } catch(err) {
        next(err);
    }
}

//M�todo borrar venta
saleCtrl.deleteSale = async (req, res, next) => {
    try{
        let sale = await findById(req.params.id);
        await findByIdAndRemove(req.params.id);
        await saleCtrl.updateStock(sale.cart,"delete");
        res.json({ status: 'Venta eliminada'});
    } catch(err){
        next(err);
    }
}

//M�todo modificar venta
saleCtrl.updateSale = async (req, res, next) => {
    try{
        let validations = true;
    
        const {id} = req.params;
        const newSale = {
            transactionNumber: req.body.transactionNumber,
            pc: req.body.pc,
            date: req.body.date,
            street: req.body.street,
            number: req.body.number,
            client: req.body.client,
            cart: req.body.cart
        }
        let oldSale = await Sale.findById(id);
        await saleCtrl.checkClient(newSale.client).catch((err) => {
            next(err);
            validations = false;
        })
        await saleCtrl.updateStock(oldSale.cart, "delete"); 
        await saleCtrl.checkProductAndStock(newSale.cart).catch((err) => {
            next(err);
            validations = false;
            await saleCtrl.updateStock(oldSale.cart, "new");
        })
        if(validations){
            saleCtrl.updateStock(oldSale.cart, "new");
            await Sale.findByIdAndUpdate(id, {$set: newSale});
            res.json({ status: 'Venta actualizada' });
        }
    } catch(err) {
        next(err);
    }
}

module.exports = saleCtrl;