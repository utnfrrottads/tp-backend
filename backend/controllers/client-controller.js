'use strict'

const Client = require('../models/client-model');
const clientController = { };

clientController.getAll = ()=>{
    Client.findAll({
        attributes: ['id_cliente', 'dni', 'nombre', 'apellido', 'direccion', 'telefono']
    })
        .then( (clients) => {
            console.log(clients);
        })
        .catch ((err) => {
            console.log(err);
        })
}


module.exports = clientController;