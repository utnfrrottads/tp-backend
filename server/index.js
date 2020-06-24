//Dependencies
const morgan = require('morgan'); //Control de logs
const express = require('express'); //Framework de NodeJS
const cors = require('cors'); //Para permitirle el acceso al FrontEnd cuando sea necesario

const app = express(); //Inicializo Server
const { mongoose } = require('./database'); //Conecto a la BD

//Settings
app.set('port', process.env.PORT || 3000); //Defino el puerto

//Middlewares
app.use(morgan('dev')); //Inicio el Middleware de control de logs
app.use(express.json()); //Inicio un Middleware para convertir los objetos JSON
app.use(cors({ origin: 'http://localhost:4200' })); //Inicio Middleware para permitir conexion al FrontEnd(Angular)

//Routes
app.use('/api/article', require('./routes/article.routes'));
app.use('/api/branch', require('./routes/branch.routes'));
app.use('/api/note', require('./routes/note.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/role', require('./routes/role.routes'));
app.use('/api/sale',require('./routes/sale.routes'));
app.use('/api/user', require('./routes/user.routes'));

//Start Server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
});