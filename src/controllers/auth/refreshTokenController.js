import jwt from 'jsonwebtoken';

function refreshTokenController() {
  function post(req, res) {
    const { body: { refreshJWTToken } } = req;

    if (refreshJWTToken !== req.session.refreshToken) {
      return res.sendStatus('401');
    }

    const { username, userRole } = jwt.decode(refreshJWTToken);

    const payload = {
      username,
      userRole,
      date: Date(),
      ipAddress: req.socket.remoteAddress,
    };

    const JWTTokens = {};
    JWTTokens.accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });
    JWTTokens.refreshToken = refreshJWTToken;

    res.status('200');
    return res.json(JWTTokens);
  }

  return { post };
}

module.exports = refreshTokenController;
