const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

require('colors')

// Importamos las rutas de las entidades.
const router_empresas = require('./routes/empresas-route');

// Middleware.
app.use(express.json());

// Agregamos los endpoints a la API.
app.use('/empresas', router_empresas);

app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
});
