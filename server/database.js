const mongoose = require('mongoose'); //Requiero el modulo de BD

const URI = 'mongodb://localhost:27017/eCommerce'; //Defino donde esta la BD (Si no existe la crea)

//Conecta a la BD
mongoose.connect(URI,  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(console.log('DataBase Connected')) //Si conecto lo muestra en consola
    .catch(err=>console.log(err)); //Si hubo un error lo muestra en consola

module.exports = mongoose; //Exporto la DB para cuando la requiera en otro lado