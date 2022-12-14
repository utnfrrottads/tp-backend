import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function customersLoginController(Customer) {
  // Middleware that executes berofe anything else, verify JWT token
  function authenticateJWTToken(req, res, next) {
    try {
      const JWTAccessToken = req.header(process.env.JWT_TOKEN_HEADER_KEY);
      const JWTAccessTokenIsVerified = jwt.verify(JWTAccessToken, process.env.JWT_SECRET);

      const payload = jwt.decode(JWTAccessToken);

      if (!JWTAccessTokenIsVerified) {
        payload.userRole = 'public';
        payload.loginStatus = 403;
        req.loggedUser = payload;
        return next(); // Incorrect token provided (401?)
      }

      payload.loginStatus = 200;
      req.loggedUser = payload;
      return next(); // Logged correctly
    } catch (err) {
      const payload = {};
      payload.loginStatus = 401;
      payload.userRole = 'public';
      req.loggedUser = payload;

      return next(); // Authorization header malformed (401)
    }
  }

  // Since token validation is in middleware, only return login status
  function get(req, res) {
    return res.sendStatus(req.loggedUser.loginStatus);
  }

  // Log in and generate JWT Tokens
  async function post(req, res) {
    const { body: { username, password } } = req;

    try {
      const customer = await Customer.findOne({ username })
        .select('-purchases -carts');

      const passwordMatch = await bcrypt.compare(password, customer.password);
      customer.password = undefined; // Avoid keep password in memory

      if (!passwordMatch) {
        res.status(401);
        return res.json({ errors: [{ customer: 'Incorrect password' }] });
      }

      req.session.loggedUser = customer;

      const payload = {
        username: customer.username,
        userRole: customer.userRole,
        date: Date(),
        ipAddress: req.socket.remoteAddress,
      };
      const JWTTokens = {};

      JWTTokens.accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '6000h' });
      JWTTokens.refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24000h' });

      req.session.refreshToken = JWTTokens.refreshToken;

      return res.json(JWTTokens);
    } catch (err) {
      res.status(404); // Customer not found
      return res.send({ errors: [{ customer: 'Username is not in database' }, err] });
    }
  }

  return { authenticateJWTToken, get, post };
}

module.exports = customersLoginController;
