import express from 'express';
import loginController from '../controllers/auth/loginController';
import refreshTokenController from '../controllers/auth/refreshTokenController';

function routes(Customer) {
  const authRouter = express.Router();

  const controllerLogin = loginController(Customer);
  const controllerRefreshToken = refreshTokenController();

  authRouter.route('/login')
    .get(controllerLogin.get)
    .post(controllerLogin.post);

  authRouter.route('/refreshtoken')
    .post(controllerRefreshToken.post);

  return authRouter;
}

module.exports = routes;
