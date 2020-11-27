const mongoose = require('mongoose'); //Importo modulo de DB
const { Schema } = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const BranchSchema = new Schema({
    cuit: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    pc: { type: String, required: true },
    phone: { type: Number, required: true }
}, { collection: 'branches' });

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Branches', BranchSchema);