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
        match: [
            /[^\s+]/,
            "Please provide a valid description",
          ]
        // Preguntar mas caracteristicas del mensaje
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
       

    },

    receiver:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    
    }
    
})      



module.exports = mongoose.model('Message', messageSchema)