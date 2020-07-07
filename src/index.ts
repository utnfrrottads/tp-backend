import 'reflect-metadata';

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { createConnection } from 'typeorm'

import empresaRouter from './routes/Empresa.route';
import LineaColectivoRouter from './routes/LineaColectivo.router';
import choferRouter from './routes/Chofer.route';

const app = express()
createConnection();

//middlewars
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(empresaRouter);
app.use(LineaColectivoRouter);
app.use(choferRouter);

app.listen(3000);
console.log('Server on port', 3000);