'use strict'

const Client = require('../models/client-model');
const clientController = { };

clientController.getAll = async (req, res) => {
    try {
        const clients = await Client.findAll({
            where: {
                activo: 1
            }
        });
        res.json(clients);
    } catch (err){
      res.json(err);
    }
    
}

clientController.getOne = async (req, res) => {
    try{
        const client = await Client.findOne({
            where: {
                id_cliente: req.params.id,
                activo: 1
            }
        });
        res.json(client);
    } catch (err) {
        res.json(err);
    }
}

clientController.createClient = async (req, res) => {
    try {
        await Client.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }); 
        res.json("Client created");
    } catch (err){
        res.json(err);
    }
    
       
}

clientController.updateClient = async (req, res) => {
    try {
        await Client.update({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }, {
            where: {
                id_cliente: req.params.id
            }
        });
        res.json("Client updated");
    } catch (err){
        res.json(err);
    }
    
}

clientController.deleteClient = async (req, res) => {
    try{
        await Client.update({
            activo: 0
        },{
            where: {
                id_cliente: req.params.id
            }
        });
        res.json("Client suspended")
    } catch (err){
        res.json(err);
    }
    
}


module.exports = clientController;