const express = require('express');
const errorHandler = require('./middleware/error-handler');
const app = express();
const port = process.env.PORT || 8080;

require('colors')

// Importamos las rutas de las entidades.
const router_empresas = require('./routes/empresas-route');

// Middleware.
app.use(express.json());

// Agregamos los endpoints a la API.
app.use('/empresas', router_empresas);

app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
});
