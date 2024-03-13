const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env'), debug: true });
require('./database/db-connection');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { httpErrorHandler } = require('./middlewares/httpErrorHandler');

const PORT = process.env.PORT || 8080;
const app = express();


// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));


// Routes
app.use('/api', routes);


// Error Handler
app.use(httpErrorHandler);


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});