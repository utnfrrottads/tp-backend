const express = require ('express');
require('dotenv').config();
const {dbConnection} = require ('./database/config');


//Create server
const app = express();


//Database connection  
dbConnection();

//settings
app.set('Port',process.env.PORT||3009);


//middlewares
app.use(express.json());

//routes
app.use('/api/users',require('./routes/user.routes'));
app.use('/api/usertypes',require('./routes/userType.routes'));
app.use('/api/fields',require('./routes/field.routes'));
app.use('/api/appointments',require('./routes/appointment.routes'));

//start server
app.listen(app.get('Port'),()=>{
    console.log(`Server on port: ${app.get('Port')}`)
});