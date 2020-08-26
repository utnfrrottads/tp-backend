const express = require("express");
const morgan = require("morgan");
const app = express();
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const { mongoose } = require("./database");

// --------------- setttings del servidor --------------- //
app.set("puerto", process.env.PORT || 3000);

cloudinary.config({
  cloud_name: "elcurco8",
  api_key: "571333189662645",
  api_secret: "7YT4hRzlift8X1iGcHEZg_5cL8Y",
});

// --------------- Middlewares --------------- //

// Sirve para ver por la consola que peticion se manda.
app.use(morgan("dev"));
// Sirve para poder subir imagenes.
app.use(fileUpload());

// Sirve para ver a quien le contesta las peticiones. Por ahora a todos.
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  next();
});

// Sirve para poder entender el formato Json.
app.use(express.json());

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

// --------------- Iniciando el server --------------- //
app.listen(app.get("puerto"), () => {
  console.log(`Server corriendo en el puerto ${app.get("puerto")}`);
});
