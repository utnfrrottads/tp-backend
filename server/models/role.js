const mongoose = require('mongoose'); //Importo modulo de DB
const {Schema} = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const RoleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    permissions: [{type: String, required: true}]     
},
{ collection : 'roles' });

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Roles', RoleSchema);
