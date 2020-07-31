const express = require("express");
const morgan = require("morgan");
const app = express();

const {mongoose} = require('./database')

// --------------- setttings del servidor --------------- //
app.set("puerto", process.env.PORT || 3000);

// --------------- Middlewares --------------- //
// Sirve para ver por la consola que peticion se manda.
app.use(morgan('dev'));

// Sirve para poder entender el formato Json. 
app.use(express.json());

// --------------- Routes --------------- //
app.use('/api/rubros', require('./routes/rubros.routes'));

// --------------- Iniciando el server --------------- //
app.listen(app.get("puerto"), () => {
  console.log(`Server corriendo en el puerto ${app.get('puerto')}`);
});
