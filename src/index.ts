import 'reflect-metadata';

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { createConnection } from 'typeorm'

import empresa from './routes/Empresa.route';
import LineaColectivo from './routes/LineaColectivo.router';
import chofer from './routes/Chofer.route';
import Recorrido from './routes/Recorrido.route';
import Calendario from './routes/Calendario.route';
import Parada from './routes/Parada.route';

const app = express()
createConnection();

//middlewars
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(empresa, function(err: any, req: any, res: any, next: any){
    if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.render('error', { error: err });
});

app.use(chofer, function(err: any, req: any, res: any, next: any){
    if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.render('error', { error: 'Error no identificado' });
});

app.use(Calendario, function(err: any, req: any, res: any, next: any){
  if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: 'Error no identificado' });
});

app.use(Recorrido, function(err: any, req: any, res: any, next: any){
  debugger;
  console.log(JSON.stringify(res));
  if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: 'Error no identificado' });
});

app.use(LineaColectivo, function(err: any, req: any, res: any, next: any){
  if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: 'Error no identificado' });
});

app.use(Parada, function(err: any, req: any, res: any, next: any){
  if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.render('error', { error: 'Error no identificado' });
});

app.listen(3000);
console.log('Server on port', 3000);