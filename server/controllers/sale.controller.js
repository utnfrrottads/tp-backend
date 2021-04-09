//Metodos a la BD aqui
const Sale = require('../models/sale');
const User = require('../models/user');
const Product = require('../models/product');
const Article = require('../models/article');
const ApiError = require('../error/ApiError');

const saleCtrl = {};

saleCtrl.updateStock = async(item, mode) => {
    try{
        let product = await Product.findById(item.product);
        switch (mode) {
            case "new":
                product.stock = product.stock - item.quantity;
                break;
            case "delete":
                product.stock = product.stock + item.quantity;
                break;
            }
                await Product.findOneAndUpdate(product.id, {$set: product}).catch(err =>
                    next(err)
                );
            
    } catch(err){
        next(err);
    }
}

saleCtrl.checkProductAndStock = async(cart) => {
    let msg;
    cart.forEach(product => {
        let p = Product.findById(product.product)

        if(p.toString().length > 0){

            if(p.stock < product.quantity){
                let article = Article.findById(p.article);
                msg = "El producto "+article.name+" no tiene stock suficiente";
            }
        } else {
            let article = Article.findById(p.article);
            msg = "No se encontro el producto "+article.name;
        }
    });
    if(msg != null){
        throw ApiError.badRequest(msg);
    }
}

saleCtrl.checkClient = async(clientID) => {

    let user = await User.findById({_id: clientID, client:true});
    if(!(user._id.toString().length > 0)){

        throw ApiError.badRequest('El cliente seleccionado no existe');
    }
}

saleCtrl.getNextTransactionNumber = async(req, res, next) => {
    try{
        console.log("Entra Aca")
        const lastSale = await Sale.find().sort({_id: -1}).limit(1)
        if(lastSale.length > 0){
            var transactionNumber = lastSale.transactionNumber + 1
            res.json({'number': transactionNumber})
        } else {
            res.json({'number': 1})
        }
    } catch(err){
        next(err)
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

saleCtrl.getSalesByUser = async (req, res, next) => {
    try {
        var {user} = req.params
        const sales = await Sale.find({client: user}).sort({date: 1});
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
    } catch(err){
        next(err);
    }
}

//M�todo crear venta
saleCtrl.createSale = async (req, res, next) => {
    try{
        let validations = true;
        const sale = new Sale({
            transactionNumber: req.body.transactionNumber,
            pc: req.body.pc,
            date: req.body.date,
            street: req.body.street,
            number: req.body.number,
            client: req.body.client,
            deletedClient: req.body.deletedClient,
            cart: req.body.cart,
            total: req.body.total
        })
        console.log(req.body)
        await saleCtrl.checkClient(sale.client).catch((err) => {
            next(err);
            validations = false;
        })
        await saleCtrl.checkProductAndStock(sale.cart).catch((err) => {
            next(err);
            validations = false;
        })
        if(validations){
            await sale.save();
            await sale.cart.forEach( item => {
                    saleCtrl.updateStock(item, "new")
                }
            )

            res.json({ status: 'Venta creada' });
        }
    } catch(err) {
        next(err);
    }
}

//M�todo borrar venta
saleCtrl.deleteSale = async (req, res, next) => {
    try{
        let sale = await Sale.findById(req.params.id);
        await Sale.findByIdAndRemove(sale._id);

        await saleCtrl.updateStock(sale.cart,"delete");
        res.json({ status: 'Venta eliminada'});
    } catch(err){
        next(err);
    }
}


module.exports = saleCtrl;