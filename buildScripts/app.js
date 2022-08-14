import express from 'express';
import session from 'express-session';
import { v4 as uuidgen } from 'uuid';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import cors from 'cors';

import chalk from 'chalk';

import Article from '../src/models/articleModel';
import Customer from '../src/models/customerModel';

const MemoryStore = require('memorystore')(session);

/* eslint-disable no-console */

const app = express();
const port = process.env.PORT || 3000;

const baseUrl = 'mongodb://localhost/';
/* // No longer necessary since mongoose v6
const dbOptions = { // it's due to a deprecation warning
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
*/
const dbOptions = {};

const sessionOptions = {
  genid: uuidgen,
  name: 'cleanning.supplies',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 3600000, // 1 hour in miliseconds
  },
  store: new MemoryStore({ // default storage is not designed for production
    checkPeriod: 3600000,
  }),
};

let db = 'cleanning_supplies_development';

switch (process.env.NODE_ENV) {
  case 'production':
    console.log(chalk.red('This is the production database'));
    db = 'cleanning_supplies_production';
    app.set('trust proxy', 1);
    sessionOptions.cookie.secure = true;
    break;
  case 'development':
    console.log(chalk.yellow('This is the devolopment database'));
    db = 'cleanning_supplies_development';
    break;
  case 'testing':
    console.log(chalk.blue('This is the testing database'));
    db = 'cleanning_supplies_testing';
    break;
  default:
    console.log(`Error ${process.env.NODE_ENV} is not a valid enviroment, connecting to development`);
}

mongoose.connect(`${baseUrl}${db}`, dbOptions);

// app.use(bodyParser.json({ limit: '10mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(session(sessionOptions));

const articleRouter = require('../src/routes/articleRouter')(Article);
const categoryRouter = require('../src/routes/categoryRouter')(Article);
const providerRouter = require('../src/routes/providerRouter')(Article);
const customerRouter = require('../src/routes/customerRouter')(Customer);
const purchaseRouter = require('../src/routes/purchaseRouter')(Customer);
const loginRouter = require('../src/routes/loginRouter')(Customer);

app.use('/api', articleRouter);
app.use('/api', categoryRouter);
app.use('/api', providerRouter);
app.use('/api', customerRouter);
app.use('/api', purchaseRouter);
app.use('/api', loginRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Cleanning Supplies API, you can see details on gitlab');
});

app.server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.green(`Running on port ${port}`));
  }
});

module.exports = app;
