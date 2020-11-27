const mongoose= require('mongoose'); //Importo modulo de DB
const {Schema} = mongoose; //Importo los esquemas de Mongo

//Creo el esquema que va a tener el documento de la coleccion
const SaleSchema =  new Schema({
    transactionNumber: {type: Number, required: true },
    pc: {type: String, required: true},
    date: {type: Date, required: true},
    street: {type: String, required: true},
    number: {type: String, required: true},
    client: { type: Schema.Types.ObjectId, required: true},
    deletedClient: {type: Object},
    cart: [
        {
            product: {type: Schema.Types.ObjectId, required: true},
            quantity: {type: Number, required: true}
        }
    ]
},
{collection: 'sales'});

//Exporto el Esquema cuando lo requiera en otro lado
module.exports = mongoose.model('Sale', SaleSchema);