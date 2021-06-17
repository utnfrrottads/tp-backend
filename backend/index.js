const express = require('express');
const db = require('./database/db-connection');
const routes = require('./routes/routes');

const colors = require ('colors');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`.green);
    console.log(`Server on port ${port}`.green); 
});