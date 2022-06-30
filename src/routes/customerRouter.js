import express from 'express';
import customerController from '../controllers/customers/customersController';
import customersCustomeridController from '../controllers/customers/customersCustomeridController';

function routes(Customer) {
  const customerRouter = express.Router();
  const controller = customerController(Customer);

  customerRouter.route('/customers')
    .get(controller.get)
    .post(controller.post);

  const controllerId = customersCustomeridController(Customer);

  customerRouter.use('/customers/:customerId', (req, res, next) => {
    controllerId.findCustomerById(req, res, next);
  });

  customerRouter.route('/customers/:customerId')
    .get(controllerId.get)
    .put(controllerId.put)
    .patch(controllerId.patch)
    .delete(controllerId.remove);

  return customerRouter;
}

module.exports = routes;
