const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 8080;

require ('colors');


// Middleware.
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use('/api', routes);


// Manejo de errores.
app.use(errorHandler);

app.listen(port, () => {
    console.log('Server running at ' + `http://localhost:${port}`.green);
});
