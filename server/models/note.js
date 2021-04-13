const mongoose = require('mongoose'); //Importo modulo de DB
const { collection } = require('./article');
const {Schema} = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const NoteSchema = new Schema ({
    name: {type: String, required: true}
},
{collection: 'notes'});

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Notes', NoteSchema);