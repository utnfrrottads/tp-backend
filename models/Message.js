const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: [true, "Provide me"],
        // match: [
        //     Revisar 
        // ],
        unique: true,

    },

    description: {
        type: String,
        required: [true, "Provide me"],
        // Preguntar mas caracteristicas del mensaje
    },

    sender_id: {
        type: Int32Array,
       

    },

    receiver_id:{
        type: Int32Array,
        

    }
    
})      



module.exports = mongoose.model('Message', messageSchema)