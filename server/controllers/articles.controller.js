//Metodos a la BD aqui
const Articles = require('../models/article');
const ApiError = require('../error/ApiError');
const article = require('../models/article');
const articlesCtrl = {};

//Controla dependencias
articlesCtrl.checkDependencies = async(id) => {
    let query = await user.find({ roles: id });
    if (query.length > 0) {
        throw ApiError.badRequest('El rol que desea eliminar se encuentra vinculado a algún usuario, revise la dependencia');
    }
}


//Controla nombre repetido
articlesCtrl.checkName = async(name, id = ' ') => {
    let articles = await Articles.find({ name: name }).select('_id');
    if ((await articles).length > 0) {
        (await articles).forEach(article => {
            if (article._id !== id) {
                throw ApiError.badRequest('El nombre del rol se encuentra repetido.');
            }
        })
    }
}

//Metodo Obtener todos los articulos
articlesCtrl.getArticles = async(req, res, next) => {
    try {
        const articles = await Articles.find();
        res.json(articles);
    } catch (err) {
        next(err)
    }

}

//Metodo obtener un articulo
articlesCtrl.getArticle = async(req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Articles.findById(id);
        res.json(article);
    } catch (err) {
        next(err)
    }

}

//Metodo editar un articulo
articlesCtrl.editArticle = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;
        if (req.body.name == "" || req.body.description == "" || req.body.presentation == "" || req.body.notes == "" || req.body.prices == "") {
            next(ApiError.badRequest('Campos incompletos'))
        }
        const article = {
            name: req.body.name,
            description: req.body.description,
            presentation: req.body.presentation,
            notes: req.body.notes,
            prices: req.body.prices
        }
        await articlesCtrl.checkName(article.name, id).catch((err) => {
            next(err);
            validations = false;
        });
        if (validations) {
            await Articles.findByIdAndUpdate(req.params.id, { $set: article }, { new: true });
            res.json({ status: "Articulo actualizado correctamente" })
        }
    } catch (err) {
        next(err);
    }
}

//Metodo borrar un articulo
articlesCtrl.deleteArticle = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;
        await articlesCtrl.checkDependencies(id).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            await Articles.findByIdAndRemove(req.params.id);
            res.json({ status: "Articulo borrado correctamente" });

        }
    } catch (err) {
        next(err);
    }
}

//Metodo crear nuevo articulo
articlesCtrl.createArticle = async(req, res, next) => {
    try {
        let validations = true;
        const article = new Articles({
            name: req.body.name,
            description: req.body.description,
            presentation: req.body.presentation,
            notes: req.body.notes,
            prices: req.body.prices
        })
        await articlesCtrl.checkName(article.name).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            const article = new Articles(req.body);
            await article.save();
            res.json({ status: "Articulo guardado correctamente" })
        }
    } catch (err) {
        next(err);
    }

}

module.exports = articlesCtrl;