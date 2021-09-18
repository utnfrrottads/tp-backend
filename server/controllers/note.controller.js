const Note = require('../models/note'); //Requiero modelo 
const ApiError = require('../error/ApiError');
const note = require('../models/note');
const NoteCtrl = {}; //Creo el objeto controlador

//Controla nombre repetido
NoteCtrl.checkName = async(name, id = ' ') => {
    let notes = await Note.find({ name: name, isActive:true }).select('_id');
    if ((await notes).length > 0) {
        (await notes).forEach(note => {
            if (note._id.toString() !== id) {
                throw ApiError.badRequest('El nombre de la nota se encuentra repetido.');
            }
        })
    }       
}


//Metodo GetAll (res= response y req= request)
NoteCtrl.getNotes = async(req, res, next) => {
    try {
        const notes = await Note.find({isActive: true}); //Busca todos los documentos
        res.json(notes); //Los envio en formato JSON
    } catch (err) {
        next(err)
    }
}

//Metodo Create
NoteCtrl.createNote = async(req, res, next) => {
    try {
        let validations = true;
        const note = new Note({ //Creo la nueva nota con los parametros enviados en el request (sin ID porque lo da la BD)
            name: req.body.name,
            isActive: true
        })
        await NoteCtrl.checkName(note.name).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            await note.save(); //Guardo en la BD (y espero que finalice)
            res.json({ status: 'Nota Guardada Correctamente', id: note._id }) //Devuelvo resultado correcto
        }
    } catch (err) {
        next(err);
    }
}

//Metodo GetOne
NoteCtrl.getNote = async(req, res, next) => {
    try {
        const { id } = req.params; //Consigo el ID mando por parametro en el get    
        const note = await Note.findById(id); //Busco por ID
        res.json(note); //Lo envío
    } catch (err) {
        next(err)
    }
}

//Metodo Update
NoteCtrl.updateNote = async(req, res, next) => {
    try {
        let validations = true;
        const { id } = req.params;
        if (req.body.name == "") {
            next(ApiError.badRequest('Campos incompletos'))
        }
        const newNote = {
            name: req.body.name,
            isActive: true
        };
        await NoteCtrl.checkName(newNote.name, id).catch((err) => {
            next(err);
            validations = false;
        })
        if (validations) {
            await Note.findByIdAndUpdate(id, { $set: newNote });
            res.json({ status: 'Nota Actualizada Correctamente' });
        }
    } catch (err) {
        next(err);
    }
}

//Metodo Delete
NoteCtrl.deleteNote = async(req, res, next) => {
    try {
        const {id} = req.params;
        let note = await Note.findById(id);
        note.isActive = false;
        await Note.findByIdAndUpdate(id, note);
        res.json({status: 'Nota Eliminada Correctamente'});
    } catch (err) {
        next(err)
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = NoteCtrl;