const express = require("express");
const morgan = require("morgan");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const env = require("node-env-file");
const authToken = require("./authToken");
require("./database");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// --------------- setttings del servidor --------------- //
env(__dirname + "/.env.dist");
app.set("puerto", process.env.PORT || 3000);

cloudinary.config({
  cloud_name: "elcurco8",
  api_key: "571333189662645",
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// --------------- Middlewares --------------- //

// Sirve para ver por la consola que peticion se manda.
app.use(morgan("dev"));
// Sirve para poder subir imagenes.
app.use(fileUpload());
// Sirve para poder entender el formato Json.
app.use(express.json());

// CORS
app.use(cors());
// Sirve para ver a quien le contesta las peticiones. Por ahora a todos.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  next();
});

// Autenticación
app.use(authToken);

// --------------- Routes --------------- //
app.use("/api/rubros", require("./routes/rubros.routes"));
app.use("/api/usuarios", require("./routes/users.routes"));
app.use("/api/comisionistas", require("./routes/comisionistas.routes"));
app.use("/api/productos", require("./routes/productos.routes"));
app.use("/api/ventas", require("./routes/ventas.routes"));

// Esto me sube la imagen a clodinary y me devuelve la URL.
app.post("/api/uploadImage", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log("No mandaron ni un archivo.");
  } else {
    cloudinary.uploader
      .upload_stream({ folder: "TTADS-TP" }, (req, info) => {
        res.send({ status: "ok", url: info.url });
      })
      .end(req.files.file.data);
  }
});

// Para validar tokens.
app.post("/api/verifyToken", (req, res) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.AUTH_SECRET, (error) => {
      if (error) {
        console.log("le dije que esta todo mal al front - FF F F F FF");
        return res.status(500).send({ status: "Error", error });
      }
      console.log("le dije que esta todo ok al front");
      res.status(200).send({ status: "ok" });
    });
  } else {
    return res.status(500).send({ status: "Error" });
  }
});

// --------------- Iniciando el server --------------- //
app.listen(app.get("puerto"), () => {
  console.log(`Server corriendo en el puerto ${app.get("puerto")}`);
});
