const express = require ('express');
require('dotenv').config();
const {dbConnection} = require ('./database/config');
const cors = require ('cors')


//Create server
const app = express();


//Database connection  
dbConnection();

//settings
app.set('Port',process.env.PORT);

//middlewares
app.use(cors({origin:'http://localhost:4200'}));
app.use(express.json());

//routes

//VALIDAR EL JWT EN CADA RUTA   
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/login',require('./routes/auth.routes'))
app.use('/api/usertypes',require('./routes/userType.routes'));
app.use('/api/fields',require('./routes/field.routes'));
app.use('/api/appointments',require('./routes/appointment.routes'));
app.use('/api/uploads',require('./routes/upload.routes'));

//start server
app.listen(app.get('Port'),()=>{
    console.log(`Server on port: ${app.get('Port')}`)
});