const mongoose = require("mongoose");

// ------------------------------------------------- direccion de la base de datos ------------------------------------------------- //
// para la base de datos en la nube usar esta.
const user = 'ttads';
const password = '1234';
const database = 'ttads-tp'
const URI = `mongodb+srv://${user}:${password}@ttads-tp.tyatw.gcp.mongodb.net/${database}?retryWrites=true&w=majority`;

// para la base de datos local usar esta:
//const URI = "mongodb://localhost/online-shopping";

mongoose
  .connect(URI)
  .then((db) => console.log("Conectado correctamente a la Base de datos."))
  .catch((error) => console.log(error));

module.exports = mongoose;
