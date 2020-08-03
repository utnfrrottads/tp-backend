const mongoose = require('mongoose')

// direccion de la base de datos.
const URI = 'mongodb://localhost/online-shopping'

mongoose.connect(URI)
    .then(db => console.log("Conectado correctamente a la DB."))
    .catch(error => console.log(error))

module.exports = mongoose
