'use strict'

const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');

const port = process.env.PORT || 3000;

//Settings
app.set('port', port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

//Routes
app.use('/', routes);


app.listen(port, ()=>{
    console.log(`Server on http://localhost:${port}`);
});
