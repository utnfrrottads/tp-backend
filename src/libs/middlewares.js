import express from 'express';

module.exports = app => {

  app.set('port', process.env.PORT || 3000);


  //middlewares
  app.use(express.json());

  // Esta linea se agrega para que angular pueda acceder sin problemas y obtener los datos
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // YOUR-DOMAIN.TLD update to match the domain you will make the request from
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
};