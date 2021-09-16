const express = require('express');
const app = express();
const port = process.env.PORT || 8080;


require ('colors');

// Importamos las rutas de las entidades.
const evaluadoresRoute = require('./routes/evaluadores-route');
const candidatosRoute = require('./routes/candidatos-route');
const vacantesRoute = require('./routes/vacantes-route');
const evaluacionesRoute = require('./routes/evaluaciones-route');
const entrevistasRoute = require('./routes/entrevistas-route');

// Middleware.
app.use(express.json());


// Agregamos los endpoints a la API.

app.use('/evaluadores', evaluadoresRoute);

app.use('/candidatos', candidatosRoute); 

app.use('/vacantes', vacantesRoute); 

app.use('/evaluaciones', evaluacionesRoute);

app.use('/entrevistas', entrevistasRoute);


app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
});
