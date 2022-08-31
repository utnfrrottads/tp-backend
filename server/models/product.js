const mongoose = require('mongoose'); //Importo modulo de DB
const {Schema} = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const ProductSchema = new Schema({
    branch: {type: Schema.Types.ObjectId, required: true},
    article: {type: Schema.Types.ObjectId, required: true},
    stock:{type: Number, required: true},
    isActive: {type: Boolean, required: true}
},
{collection: 'products'})

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Product', ProductSchema);