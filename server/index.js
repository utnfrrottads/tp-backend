//Dependencies
const morgan = require('morgan'); //Control de logs
const express = require('express'); //Framework de NodeJS
const cors = require('cors'); //Para permitirle el acceso al FrontEnd cuando sea necesario

const app = express(); //Inicializo Server
const {mongoose} = require('./database'); //Conecto a la BD

//Settings
app.set('port', process.env.PORT || 3000); //Defino el puerto

//Middlewares
app.use(morgan('dev')); //Inicio el Middleware de control de logs
app.use(express.json()); //Inicio un Middleware para convertir los objetos JSON
app.use(cors({origin: 'http://localhost:4200'})); //Inicio Middleware para permitir conexion al FrontEnd(Angular)

//Routes
//app.use('./api',require('./routes')); //Aca se van agregando segun vayamos creando las rutas para cada ABMC

//Start Server
app.listen(app.get('port'),()=>{
    console.log(`Server on Port ${app.get('port')}`);
});

