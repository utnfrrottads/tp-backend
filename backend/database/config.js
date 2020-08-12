const mongoose = require ('mongoose');

const URI = "CADENA DE CONEXION";

const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.DB_STRING,{
            useCreateIndex:true,
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('DB is connected')
    }catch(error){
        console.log(error);
        throw new Error('Database connection error')
    }
}

module.exports = {dbConnection};