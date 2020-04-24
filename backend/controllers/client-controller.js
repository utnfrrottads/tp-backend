'use strict'

const Client = require('../models/client-model');
const clientController = { };

clientController.getAll = async (req, res) => {
    await Client.findAll({
        attributes: ['id_cliente', 'dni', 'nombre', 'apellido', 'direccion', 'telefono']
    })
        .then( (clients) => {
            res.json(clients);
        })
        .catch ((err) => {
            console.log(err);
        })
}

clientController.getOne = async (req, res) => {
    await Client.findByPk(req.params.id, {
        attributes: ['id_cliente', 'dni', 'nombre', 'apellido', 'direccion', 'telefono']
    })
        .then( (clients) => {
            res.json(clients);
        })
        .catch ((err) => {
            console.log(err);
        })
}

/* clientController.createClient = async (req, res) => {
    await Client.findOrCreate({
        attributes: ['id_cliente', 'dni', 'nombre', 'apellido', 'direccion', 'telefono'],
        where: {
            dni: req.body.dni
        },
        defaults: {
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        }
    })
        .then(console.log('Client saved'))
        .catch(console.log('Error'));   
} */


module.exports = clientController;