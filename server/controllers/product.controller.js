const Product = require('../models/product'); //Requiero modelo 
const Article = require('../models/article');
const Branch = require('../models/branch');
const ApiError = require('../error/ApiError');

const ProductCtrl = {}; //Creo el objeto controlador

//Controla repetido
ProductCtrl.checkDuplicate = async(articleID, branchID, productID = '  ') => {
    let product = Product.find({article: articleID, branch: branchID}).select('_id');
    if( product.length>0){
        if(product._id = productID){
            throw ApiError.badRequest('El articulo ya se encuentra cargado para esa sucursal.');
        }
    }
}

//Valida que el articulo exista
ProductCtrl.checkArticle = async(articleID) => {
    let article = await Article.findById(articleID);

    if(!(article._id.toString().length > 0)) {

        throw ApiError.badRequest('El articulo ingresado no existe.');
    }
}

//Valida que la rama exista
ProductCtrl.checkBranch = async(branchID) => {
    let branch = await Branch.findById(branchID);

    if(!(branch._id.toString().length > 0)) {

        throw ApiError.badRequest('La rama seleccionada no existe');
    }
}

//Metodo GetAll (res= response y req= request)
ProductCtrl.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({isActive: true}); //Busca todos los documentos activos
        res.json(products); //Los envio en formato JSON
    } catch (err){
        next(err)
    }
}

ProductCtrl.getProducts = async (req, res, next) => {
    try {
        const product = await Product.find();
        const product1 = await Product.find();

        const branchIds = product.map(x => x.branch).flat(1);
        const articleIds = product1.map(x => x.article).flat(1); 

        const branch = await Branch.find().where('_id').in(branchIds);
        const article = await Article.find().where('_id').in(articleIds);

        var result = [];

        product.forEach(prod => {

            var productResult = prod.toObject();

            productResult.branchInfo = [];
            productResult.articleInfo = [];

            const br = branch.find(x => x._id.toString() == productResult.branch);

            productResult.branchInfo.push({
                branchId : productResult.branch,
                street: br.street + ' ' + br.number
            });

            const art = article.find(x => x._id.toString() == productResult.article);

            productResult.articleInfo.push({
                articleId : productResult.article,
                name: art.name
            });
             
            result.push(productResult);

        });

        res.json(result);
    } catch (err) {
        next(err);
    }
}

//Metodo Create
ProductCtrl.createProduct = async (req, res, next) => {
    try{
        let validations = true;
        const product = new Product({ //Creo el nuevo producto con los parametros enviados en el request (sin ID porque lo da la BD)
            branch: req.body.branch,
            article: req.body.article,
            stock: req.body.stock,
            isActive: true
        });  
        await ProductCtrl.checkArticle(product.article).catch((err) => {
            next(err);
            validations = false;
        });
        await ProductCtrl.checkBranch(product.branch).catch((err) => {
            next(err);
            validations = false;
        })
        await ProductCtrl.checkDuplicate(product.article, product.branch).catch((err) =>  {
            next(err);
            validations = false;
        })
        if(validations){
            await product.save(); //Guardo en la BD (y espero que finalice)  
            res.json({status: 'Producto Guardado Correctamente'}) //Devuelvo resultado correcto
        }
    } catch(err) {
        next(err)
    }
}

//Metodo GetOne
ProductCtrl.getProduct = async (req, res, next) => {
    try{
        const {id} = req.params; //Consigo el ID mando por parametro en el get
        const product = await Product.findById(id); //Busco por ID
        res.json(product); //Lo envío
    } catch(err){
        next(err);
    }
}

//Metodo Update
ProductCtrl.updateProduct = async (req, res, next) => {
    try {
        let validations = true;
        const {id} = req.params;
        const newProduct = {
            branch: req.body.branch,
            article: req.body.article,
            stock: req.body.stock,
            isActive: true
        }
        await ProductCtrl.checkArticle(newProduct.article).catch((err) => {
            next(err);
            validations = false;
        })
        await ProductCtrl.checkBranch(newProduct.branch).catch((err) => {
            next(err);
            validations = false;
        })
        await ProductCtrl.checkDuplicate(newProduct.article, newProduct.branch, id).catch((err) => {
            next(err);
            validations = false;
        })
        if(validations){
            await Product.findByIdAndUpdate(id, {$set: newProduct})
            res.json({status: 'Poducto Actualizado Correctamente'});
        }
    } catch (err) {
        next(err);
    }

}

//Metodo Delete
ProductCtrl.deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params;
        let product = await Product.findById(id);
        product.isActive = false;
        await Product.findByIdAndUpdate(id, product);
        res.json({status: 'Producto Eliminado Correctamente'});
    } catch (err) {
        next(err);
    }
}

ProductCtrl.getProductWithStock = async (req, res, next) => {
    try{
        let articleID = req.body._id;
        let stock = req.body.qty;
        let avaiableProducts = []
        let products = await Product.find({article: articleID, isActive: true})
        if(products.length > 0){
            products.forEach(product => {
                if(product.stock >= stock){
                    avaiableProducts.push(product)
                }
            })  
        } 
        if(avaiableProducts.length > 0) {
            res.json(avaiableProducts) 
        } else{
            throw ApiError.badRequest('No Hay Stock en Ninguna Sucursal')
        }
    } catch (err){
        next(err)
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = ProductCtrl;