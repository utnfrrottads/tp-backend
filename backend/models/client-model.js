const sequelize = require('../database/db-connection');
const Sequelize = require('sequelize');

const Client = sequelize.define('clientes', {
    id_cliente: { type: Sequelize.INTEGER, primaryKey: true },
    dni: Sequelize.STRING,
    nombre: Sequelize.STRING,
    apellido: Sequelize.STRING,
    direccion: Sequelize.STRING,
    telefono: Sequelize.STRING
});

module.exports = Client;
