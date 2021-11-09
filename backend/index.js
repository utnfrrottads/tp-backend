const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
const app = express();
const port = process.env.PORT || 8080;

require ('colors');

// Importamos las rutas de las entidades.
const evaluadoresRoute = require('./routes/evaluadores-route');
const candidatosRoute = require('./routes/candidatos-route');
const vacantesRoute = require('./routes/vacantes-route');
const evaluacionesRoute = require('./routes/evaluaciones-route');
const entrevistasRoute = require('./routes/entrevistas-route');
const empresasRoute = require('./routes/empresas-route');

// Middleware.
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Agregamos los endpoints a la API.
app.use('/evaluadores', evaluadoresRoute);
app.use('/candidatos', candidatosRoute); 
app.use('/vacantes', vacantesRoute); 
app.use('/evaluaciones', evaluacionesRoute);
app.use('/entrevistas', entrevistasRoute);
app.use('/empresas', empresasRoute);

// Manejo de errores.
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
});
