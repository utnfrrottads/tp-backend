const Note = require('../models/note'); //Requiero modelo 

const NoteCtrl = {}; //Creo el objeto controlador

//Metodo GetAll (res= response y req= request)
NoteCtrl.getNotes = async (req, res) => {
    try{ const notes = await Note.find(); //Busca todos los documentos
        res.json(notes); //Los envio en formato JSON
    } catch (err) {
        res.status(500).send({ error: "Algo salió mal." });
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
    } catch (err) {
        res.status(500).send({ error: "Entidad no encontrada." });
    }
}

//Metodo Update
NoteCtrl.updateNote = async (req, res) => {
    try {
        const {id} = req.params;
        const newNote = {
            name: req.body.name
        }
        await Note.findByIdAndUpdate(id, {$set: newNote});
        res.json({status: 'Nota Actualizada Correctamente'});
    } catch(err){
        res.json({status: err})
    }
}

//Metodo Delete
NoteCtrl.deleteNote = async (req, res) => {
    try {
        const {id} = req.params;
        await Note.findByIdAndRemove(id);
        res.json({status: 'Nota Eliminada Correctamente'});
    } catch(err){
        res.json({status: err})
    }
}

//Exporto el controlador para requerirlo en otro lado
module.exports = NoteCtrl;