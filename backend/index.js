const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

require ('colors');

// Importamos las rutas de las entidades.
const evaluadoresRoute = require('./routes/evaluadores-route');
const candidatosRoute = require('./routes/candidatos-route');
const vacantesRoute = require('./routes/vacantes-route');

// Middleware.
app.use(express.json());

// Agregamos los endpoints a la API.
app.use('/evaluadores', evaluadoresRoute); // Entra en el archivo evaluadores-route.js dónde están definidas todas las rutas para los evaluadores

app.use('/candidatos', candidatosRoute); // Entra en el archivo candidatos-route.js dónde están definidas todas las rutas para los candidatos

app.use('/vacantes', vacantesRoute); // Entra en el archivo vacantes-route.js dónde están definidas todas las rutas para las vacantes


app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
    console.log('Server on port ' + `${port}`.green);
});