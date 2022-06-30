import express from 'express';
import purchasesController from '../controllers/purchases/purchasesController';
import purchasesPurchaseidController from '../controllers/purchases/purchasesPurchaseidController';

function routes(Customer) {
  const purchaseRouter = express.Router();
  const controller = purchasesController(Customer);

  purchaseRouter.route('/purchases/:customerId')
    .get(controller.get);

  const controllerId = purchasesPurchaseidController(Customer);

  purchaseRouter.use('/purchases/:customerId/:purchaseCode', (req, res, next) => {
    controllerId.findPurchaseByCode(req, res, next);
  });

  purchaseRouter.route('/purchases/:customerId/:purchaseCode')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return purchaseRouter;
}

module.exports = routes;
