const mongoose = require('mongoose'); //Importo modulo de DB
const {Schema} = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const ArticleSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    presentation: {type: String, required: true},
    notes: [{type: Schema.Types.ObjectId, required: true}],
    prices: [
        {
            price: {type: Number, required: true},
            date: {type: Date, required: true}
        }
    ]
},
{collection: 'articles'});

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Articles', ArticleSchema);