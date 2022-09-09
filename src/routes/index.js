import Article from '../models/articleModel';
import Customer from '../models/customerModel';

const articleRouter = require('./articleRouter')(Article);
const categoryRouter = require('./categoryRouter')(Article);
const providerRouter = require('./providerRouter')(Article);
const customerRouter = require('./customerRouter')(Customer);
const purchaseRouter = require('./purchaseRouter')(Customer);
const loginRouter = require('./loginRouter')(Customer);

function routes(app) {
  const baseUrl = '/api';

  app.use(`${baseUrl}/articles`, articleRouter);
  app.use(`${baseUrl}/categories`, categoryRouter);
  app.use(`${baseUrl}/providers`, providerRouter);
  app.use(`${baseUrl}/customers`, customerRouter);
  app.use(`${baseUrl}/purchases`, purchaseRouter);
  app.use(`${baseUrl}/login`, loginRouter);
}

module.exports = routes;
