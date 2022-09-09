import express from 'express';
import providerController from '../controllers/providers/providersController';
import providerProvideridController from '../controllers/providers/providersProvideridController';

function routes(Article) {
  const providerRouter = express.Router();
  const controller = providerController(Article);

  providerRouter.route('/')
    .get(controller.get);

  const controllerId = providerProvideridController(Article);

  providerRouter.use('/:providerCuit', (req, res, next) => {
    controllerId.findProviderByCuit(req, res, next);
  });

  providerRouter.route('/:providerCuit')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return providerRouter;
}

module.exports = routes;
