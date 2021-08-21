const express = require('express');

const evaluadoresRoute = require('./routes/evaluadores-route');
const vacantesRoute = require('./routes/vacantes-route');

require ('colors');

const app = express();
const port = 3000;

app.use(express.json());


// Rutas

app.use('/evaluadores', evaluadoresRoute); // Entra en el archivo evaluadores-route.js dónde están definidas todas las rutas para los evaluadores

app.use('/vacantes', vacantesRoute); // Entra en el archivo vacantes-route.js dónde están definidas todas las rutas para las vacantes


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`.green);
    console.log(`Server on port ${port}`.green);
});