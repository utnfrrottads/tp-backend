const express = require ('express');
const {dbConnection} = require ('./database/config');


//Create server
const app = express();


//Database connection  
dbConnection();

//settings
app.set('port',process.env.PORT);


//middlewares
app.use(express.json());

//routes

//start server
app.listen(app.get('port'),()=>{
    console.log(`Server on port: ${app.get('port')}`)
});