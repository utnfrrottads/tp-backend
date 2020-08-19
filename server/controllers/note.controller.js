const Note = require('../models/note'); //Requiero modelo 
const Article = require('../models/article'); //Requiero modelo 
const ApiError = require('../error/ApiError');

const NoteCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
NoteCtrl.getNotes = async (req, res, next) => {
    try{ const notes = await Note.find(); //Busca todos los documentos
        res.json(notes); //Los envio en formato JSON
    } catch(err){
        next(err);
    }
}

//Controla nombre de nota repetido
NoteCtrl.checkNoteName = async (name, id=' ') => {
    let notes = await Note.find({name: name})
    notes.forEach(note => {
        if(note._id!==id){
            throw ApiError.badRequest('El nombre de la nota ya se encuentra registrado.');
        }
    });
}

//Controla dependencias en otros documentos
NoteCtrl.checkDependencies = async (id)=>{
    let query = Article.find({note: id});
    if((await query).length > 0){
        throw ApiError.badRequest('La nota que desea eliminar está asignada a un articulo, eliminela o reasignela para continuar.');
    }
}

//Metodo Create
NoteCtrl.createNote = async (req, res) => {
    try {
        const note = new Note({ //Creo la nueva nota con los parametros enviados en el request (sin ID porque lo da la BD)
            name: req.body.name
        });
        await note.save(); //Guardo en la BD (y espero que finalice)
        res.json({status: 'Nota Guardada Correctamente'}) //Devuelvo resultado correcto
    } catch(err){
        console.log('error catch', err);
        res.json({status: err})
    }
}

//Metodo GetOne
NoteCtrl.getNote = async (req, res) => {
    try {
        const {id} = req.params; //Consigo el ID mando por parametro en el get
        const note = await Note.findById(id); //Busco por ID
        res.json(note); //Lo envío
    } catch(err) {
        next(err);
    }
}

//Metodo Update
NoteCtrl.updateNote = async (req, res, next) => {
    try {
        let validations = true;
        const {id} = req.params;
        if (req.body.name == null) {
            next(ApiError.badRequest('Campos incompletos'));
            validations = false;
        }
        const newNote = {
            name: req.body.name
        }
        await NoteCtrl.checkNoteName(newNote.name,id).catch((err)=>{
            next(err);
            validations = false;
        });
        if(validations){
            await Note.findByIdAndUpdate(id, {$set: newNote});
            res.json({status: 'Nota Actualizada Correctamente'});
        }
    } catch(err){
        next(err);
    }
}

//Metodo Delete
NoteCtrl.deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        let validations = true;
        await NoteCtrl.checkDependencies(id).catch((err)=>{
            if(req.params.reasign === "true"){
                NoteCtrl.reasignNote(id);
            } else {
                next(err);
                validations = false;
            }
        });
        if(validations){
            await Note.findByIdAndRemove(id);
            res.json({status: 'Nota Eliminada Correctamente'});
        }
    } catch(err){
        next(err);
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = NoteCtrl;