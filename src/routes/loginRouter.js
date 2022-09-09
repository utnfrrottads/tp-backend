import express from 'express';
import loginController from '../controllers/loginController';

function routes(Customer) {
  const loginRouter = express.Router();

  const controller = loginController(Customer);

  loginRouter.route('/')
    .get(controller.get)
    .post(controller.post);

  return loginRouter;
}

module.exports = routes;
