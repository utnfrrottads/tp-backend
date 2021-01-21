const jwt = require("jsonwebtoken");
const env = require("node-env-file");
env(__dirname + "/.env.dist");

module.exports = (req, res, next) => {
  if (req.path.startsWith("/api/usuarios/") && req.method == "PUT") {
    if (req.headers.authorization) {
      // verifico que el token sea valido
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.AUTH_SECRET, (error) => {
        if (error) return res.status(500).send({ status: "Error", error });
        next();
      });
    } else {
      res.status(403).send({ message: "No tienes permisos para editar el usuario" });
    }
  } else next();
};
