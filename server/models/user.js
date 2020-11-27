const mongoose = require('mongoose'); //Importo modulo de DB
const { Schema } = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const UserSchema = new Schema({
    dni: { type: String, required: true },
    names: { type: String, required: true },
    lastNames: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    pc: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    flat: { type: String },
    phone: { type: String, required: true },
    employee: { type: Boolean, required: true },
    client: { type: Boolean, required: true },
    roles: [{ type: Schema.Types.ObjectId, required: true }]
}, { collection: 'users' });

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('User', UserSchema);