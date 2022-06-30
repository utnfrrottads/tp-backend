import express from 'express';
import providerController from '../controllers/providers/providersController';
import providerProvideridController from '../controllers/providers/providersProvideridController';

function routes(Article) {
  const providerRouter = express.Router();
  const controller = providerController(Article);

  providerRouter.route('/providers')
    .get(controller.get);

  const controllerId = providerProvideridController(Article);

  providerRouter.use('/providers/:providerCuit', (req, res, next) => {
    controllerId.findProviderByCuit(req, res, next);
  });

  providerRouter.route('/providers/:providerCuit')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return providerRouter;
}

module.exports = routes;
