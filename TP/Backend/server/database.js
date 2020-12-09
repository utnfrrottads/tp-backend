const mongoose = require("mongoose");
const env = require('node-env-file')
env(__dirname + '/.env.dist')

// ------------------------------------------------- direccion de la base de datos ------------------------------------------------- //
// para la base de datos en la nube usar esta.
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DBNAME;

const URI = `mongodb+srv://${user}:${password}@ttads-tp.tyatw.gcp.mongodb.net/${database}?retryWrites=true&w=majority`;

// para la base de datos local usar esta:
//const URI = "mongodb://localhost/online-shopping";

mongoose
  .connect(URI)
  .then((db) => {
    console.log("--------------------------------------------")
    console.log("Conectado correctamente a la Base de datos.")
    console.log("--------------------------------------------")
  })
  .catch((error) => console.log(error));

module.exports = mongoose;
