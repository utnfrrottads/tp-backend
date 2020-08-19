const Product = require('../models/product'); //Requiero modelo 
const Branch = require('../models/branch'); //Requiero modelo 
const Article = require('../models/article'); //Requiero modelo 
const ApiError = require('../error/ApiError');
const Sale = require('../models/sale'); //Requiero modelo 

const ProductCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
ProductCtrl.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find(); //Busca todos los documentos
        console.log(products);
        res.json(products); //Los envio en formato JSON
    } catch(err){
        next(err);
    }
}

//Controla sucursales existentes
ProductCtrl.checkBranchs = async (branch)=> {
    if(branch.length > 0){
        let query = await Branch.find().select('_id');
        let allBranchs = JSON.stringify(query);
        if(!allBranchs.includes(branch)){
            throw ApiError.badRequest('La sucursal ingresada no existe.');
        }
    }
}

//Controla articulos existentes
ProductCtrl.checkArticles = async (article)=> {
    if(article.length > 0){
        let query = await Article.find().select('_id');
        let allArticles = JSON.stringify(query);
        if(!allArticles.includes(article)){
            throw ApiError.badRequest('El articulo ingresado no existe.');
        }
    }
}

//Metodo Create
ProductCtrl.createProduct = async (req, res, next) => {
    try{
        let validations = true;
        const product = new Product({ //Creo el nuevo producto con los parametros enviados en el request (sin ID porque lo da la BD)
            branch: req.body.branch,
            article: req.body.article,
            permissions: req.body.permissions,
            stock: req.body.stock
        });
        await ProductCtrl.checkBranchs(req.body.branch).catch((err)=>{
            next(err);
            validations = false;
        });
        await ProductCtrl.checkArticles(req.body.article).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await product.save(); //Guardo en la BD (y espero que finalice)
            res.json({status: 'Producto Guardado Correctamente', product: product}) //Devuelvo resultado correcto
        }
    } catch(err){
        next(err);
    }
}

//Metodo GetOne
ProductCtrl.getProduct = async (req, res, next) => {
    try {
        const {id} = req.params; //Consigo el ID mando por parametro en el get
        const product = await Product.findById(id); //Busco por ID
        res.json(product); //Lo envío
    } catch(err) {
        next(err);
    }
}

//Metodo Update
ProductCtrl.updateProduct = async (req, res, next) => {
    try{
        let validations = true;
        const {id} = req.params;
        if(req.body.branch == null || req.body.article == null || req.body.permissions == null || req.body.stock == null) {
            next(ApiError.badRequest('Campos incompletos'));
            validations = false;
        }
        const newProduct = {
            branch: req.body.branch,
            article: req.body.article,
            permissions: req.body.permissions,
            stock: req.body.stock
        }
        await ProductCtrl.checkBranchs(req.body.branch).catch((err)=>{
            next(err);
            validations = false;
        });
        await ProductCtrl.checkArticles(req.body.article).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await Product.findByIdAndUpdate(id, {$set: newProduct});
            res.json({status: 'Poducto Actualizado Correctamente'});

        }
    } catch(err){
        next(err);
    }
}

//Controla dependencias en otros documentos
ProductCtrl.checkDependencies = async (id)=>{
    let query = await Sale.find({"cart.product": id});
    if(query.length > 0) {
        throw ApiError.badRequest('El producto que desea eliminar esta asignado a una venta, eliminela o reasignelo para continuar.');
    }
    return true;
}

ProductCtrl.reasignProduct= async (id) => {
    const prod = await Product.findById(id).lean();
    await Sale.find({"cart.product": id}).lean().then(
        sales => {
            sales.forEach( sale => {
                sale.product = null;
                sale.deletedProduct = {
                    branch: prod.branch,
                    article: prod.article,
                    stock: prod.stock
                }
                Sale.findByIdAndUpdate(sale._id, {$set: sale}).catch(err => {
                    next(err);
                });
            })
        }
    )
}

//Metodo Delete
ProductCtrl.deleteProduct = async (req, res, next) => {
     try {
        const {id} = req.params;

        console.log(req.body.reasign);

        if (await ProductCtrl.checkDependencies(id)){
            if(req.body.reasign == true){
                ProductCtrl.reasignProduct(id);
            }
    
            await Product.findByIdAndRemove(id);
            res.json({status: 'Producto Eliminado Correctamente'});
        }


    } catch(err){
        next(err);
    } 
}

//Exporto el controlador para requerirlo en otro lado
module.exports = ProductCtrl;