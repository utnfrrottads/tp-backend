//Metodos a la BD aqui
const Articles = require('../models/article');
const articlesCtrl = {};

//Metodo Obtener todos los articulos
articlesCtrl.getArticles = async(req, res) => {
    const articles = await Articles.find();
    res.json(articles);
}

//Metodo obtener un articulo
articlesCtrl.getArticle = async(req, res) => {
    const article = await Articles.findById(req.params.id);
    res.json(article);
}

//Metodo editar un articulo}
articlesCtrl.editArticle = async(req, res) => {
    const article = {
        name: req.body.name,
        description: req.body.description,
        presentation: req.body.presentation,
        notes: req.body.notes,
        prices: req.body.prices
    };
    await Articles.findByIdAndUpdate(req.params.id, { $set: article }, { new: true });
    res.json({ status: "Articulo actualizado correctamente" })
}

//Metodo borrar un articulo
articlesCtrl.deleteArticle = async(req, res) => {
    await Articles.findByIdAndRemove(req.params.id);
    res.json({ status: "Articulo borrado correctamente" });
}

//Metodo crear nuevo articulo
articlesCtrl.createArticle = async(req, res) => {
    const article = new Articles(req.body);
    await article.save();
    res.json({ status: "Articulo guardado correctamente" })
}

module.exports = articlesCtrl;