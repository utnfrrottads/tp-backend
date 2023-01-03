import Article from '../models/articleModel';
import Customer from '../models/customerModel';

import loginController from '../controllers/auth/loginController';

const articleRouter = require('./articleRouter')(Article);
const categoryRouter = require('./categoryRouter')(Article);
const providerRouter = require('./providerRouter')(Article);
const customerRouter = require('./customerRouter')(Customer);
const purchaseRouter = require('./purchaseRouter')(Customer);
const authRouter = require('./authRouter')(Customer);

function routes(app) {
  const baseUrl = '/api';
  const controllerLogin = loginController(Customer);

  // Middleware that verify JWT Token before go to any path
  app.use(controllerLogin.authenticateJWTToken);

  app.use(`${baseUrl}/articles`, articleRouter);
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/providers`, providerRouter);
  app.use(`${baseUrl}/customers`, customerRouter);
  app.use(`${baseUrl}/purchases`, purchaseRouter);
  app.use(`${baseUrl}/auth`, authRouter);
}

module.exports = routes;
