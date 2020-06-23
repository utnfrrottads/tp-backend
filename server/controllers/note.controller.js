const Note = require('../models/note'); //Requiero modelo 

const NoteCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
NoteCtrl.getNotes = async (req, res) => {
    const notes = await Note.find(); //Busca todos los documentos
    console.log(notes);
    res.json(notes); //Los envio en formato JSON
}

//Metodo Create
NoteCtrl.createNote = async (req, res) => {
    const note = new Note({ //Creo la nueva nota con los parametros enviados en el request (sin ID porque lo da la BD)
        name: req.body.name
    });
    await note.save(); //Guardo en la BD (y espero que finalice)
    res.json({status: 'Nota Guardada Correctamente'}) //Devuelvo resultado correcto
}

//Metodo GetOne
NoteCtrl.getNote = async (req, res) => {
    const {id} = req.params; //Consigo el ID mando por parametro en el get
    const note = await Note.findById(id); //Busco por ID
    res.json(note); //Lo envío
}

//Metodo Update
NoteCtrl.updateNote = async (req, res) => {
    const {id} = req.params;
    const newNote = {
        name: req.body.name
    }
    await Note.findByIdAndUpdate(id, {$set: newNote});
    res.json({status: 'Nota Actualizada Correctamente'});
}

//Metodo Delete
NoteCtrl.deleteNote = async (req, res) => {
    const {id} = req.params;
    await Note.findByIdAndRemove(id);
    res.json({status: 'Nota Eliminada Correctamente'});
}

//Exporto el controlador para requerirlo en otro lado
module.exports = NoteCtrl;