const express = require('express');
const db = require('./database/db-connection');

const colors = require ('colors');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Server on port ${port}`.green); 
});