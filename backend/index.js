'use strict'

const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');

const port = process.env.PORT || 3000;

//Settings
app.set('port', port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/tpbackend2020', routes);


app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
});
