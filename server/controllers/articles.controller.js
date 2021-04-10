//Metodos a la BD aqui
const Articles = require('../models/article');
const Note = require('../models/note')
const ApiError = require('../error/ApiError');
const article = require('../models/article');
const articlesCtrl = {};


//Valida que la nota exista
articlesCtrl.checkNotes = async(notes) => {
    if (notes.length > 0) {
        let query = await Note.find().select('_id');
        let allNotes = JSON.stringify(query);
        notes.forEach(note => {
            if (!allNotes.includes(note)) {
                throw ApiError.badRequest('Alguna nota inexistente');
            }
        })
    }
}

//Controla nombre repetido
articlesCtrl.checkName = async(name, id = ' ') => {
    let articles = await Articles.find({ name: name }).select('_id');
    if ((await articles).length > 0) {
        (await articles).forEach(article => {
            if (article._id.toString() !== id) {
                throw ApiError.badRequest('El nombre del articulo se encuentra repetido.');
            }
        })
    }
}

//Metodo Obtener todos los articulos
articlesCtrl.getArticles = async(req, res, next) => {
    try {
        
        // const articles = await Articles.find();

        // const noteIds = articles.map(x => x.notes).flat(1);

        // const notes = await Note.find().where('_id').in(noteIds);

        // var result = [];

        // articles.forEach(article => {

        //     var articleResult = article.toObject();

        //     articleResult.notesInfo = [];

        //     if (articleResult.notes) {
        //         articleResult.notes.forEach(noteId => {

        //             const note = notes.find(x => x._id.toString() == noteId);
    
        //             articleResult.notesInfo.push({
        //                 noteId: noteId,
        //                 name: note.name
        //             });
    
        //         });
    
        //     }

        //     result.push(articleResult);

        // });

        // res.json(result);

        // console.log(req.body)
        const articles = await Articles.find();
        
        if(req.body.notes.length > 0 || req.body.presentation.length >0 || req.body.name.length > 0) {
            let arrNotes = []
            for(let i in req.body.notes){
                arrNotes[i] = await Note.find({name : req.body.notes[i]}).select('_id')
            }
            let notesOrigin=[]
            for(let i=0; i<arrNotes.length; i++){
                notesOrigin = notesOrigin.concat(arrNotes[i])
            }
            let i=0;
            (notesOrigin).forEach(note =>{
                req.body.notes[i] = note._id.toString()
                i +=1
            })

            let articles1=[]
            for(let i in req.body.name){
                articles1.push(articles.filter((val) => val.name.toLowerCase().includes(req.body.name[i].toLowerCase())))             
            }
            
            for(let i in req.body.presentation){
                articles1.push(articles.filter((val) => val.presentation == req.body.presentation[i]))
            }
            
            for(let i in req.body.notes){
                articles1.push(articles.filter((val) => val.notes == req.body.notes[i]))
            }
            
            let artOrigin=[]
            for(let i=0; i<articles1.length; i++){
                artOrigin = artOrigin.concat(articles1[i])
            }


            const articles2 = [...new Set(artOrigin)];
            articles2.length === 0 ? res.json({ status: "No se encontró ningun producto" }) : res.json(articles2)
        } else {

            const noteIds = articles.map(x => x.notes).flat(1);

            const notes = await Note.find().where('_id').in(noteIds);

            var result = [];

            articles.forEach(article => {

                var articleResult = article.toObject();

                articleResult.notesInfo = [];

                if (articleResult.notes) {
                    articleResult.notes.forEach(noteId => {

                        const note = notes.find(x => x._id.toString() == noteId);
        
                        articleResult.notesInfo.push({
                            noteId: noteId,
                            name: note.name
                        });
        
                    });
        
                }

                result.push(articleResult);

            });
            res.json(result);

        }

        

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
            await Articles.findByIdAndUpdate(id, { $set: article });
            res.json({ status: "Articulo actualizado correctamente" })
        }
    } catch (err) {
        next(err);
    }
}

//Metodo borrar un articulo
articlesCtrl.deleteArticle = async(req, res, next) => {
    try {
        await Articles.findByIdAndRemove(req.params.id);
        res.json({ status: "Articulo borrado correctamente" });

    } catch (err) {
        next(err);
    }
}

//Metodo crear nuevo articulo
articlesCtrl.createArticle = async(req, res, next) => {
    try {
        console.log("pase")
        let validations = true;
        const article = new Articles({
            name: req.body.name,
            description: req.body.description,
            presentation: req.body.presentation,
            notes: req.body.note,
            prices: req.body.prices
        })


        //console.log(Articles.notes)

        await articlesCtrl.checkNotes(article.notes).catch((err) => {
            next(err);
            validations = false;
        })
        await articlesCtrl.checkName(article.name).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            await article.save();
            res.json({ status: "Articulo guardado correctamente" })
        }
    } catch (err) {
        next(err);
    }

}

module.exports = articlesCtrl;