const Product = require('../models/product'); //Requiero modelo 

const ProductCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
ProductCtrl.getProducts = async (req, res) => {
    const products = await Product.find(); //Busca todos los documentos
    res.json(products); //Los envio en formato JSON
}

//Metodo Create
ProductCtrl.createProduct = async (req, res) => {
    const product = new Product({ //Creo el nuevo producto con los parametros enviados en el request (sin ID porque lo da la BD)
        branch: req.body.branch,
        article: req.body.article,
        permissions: req.body.permissions,
        stock: req.body.stock
    });  
    await product.save(); //Guardo en la BD (y espero que finalice)  
    res.json({status: 'Producto Guardado Correctamente'}) //Devuelvo resultado correcto
}

//Metodo GetOne
ProductCtrl.getProduct = async (req, res) => {
    const {id} = req.params; //Consigo el ID mando por parametro en el get
    const product = await Product.findById(id); //Busco por ID
    res.json(product); //Lo envío
}

//Metodo Update
ProductCtrl.updateProduct = async (req, res, err) => {
    try {
        const {id} = req.params;
        const newProduct = {
            branch: req.body.branch,
            article: req.body.article,
            permissions: req.body.permissions,
            stock: req.body.stock
        }
        await Product.findByIdAndUpdate(id, {$set: newProduct})
        res.json({status: 'Poducto Actualizado Correctamente'});
    } catch (error) {
        res.json({status: 500});
    }

}

//Metodo Delete
ProductCtrl.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndRemove(id);
        res.json({status: 'Producto Eliminado Correctamente'});
    } catch (error) {
        res.json({status: 500});
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = ProductCtrl;