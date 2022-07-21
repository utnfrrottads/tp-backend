require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./config/db");

// Conectamos a la base de datos
connection();

// Creamos el servidor
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use(require("./routes/index.routes"));

app.use("/user", require("./routes/user.routes"));
app.use("/summoner", require("./routes/lolsummoner.routes"));
app.use("/tournament", require("./routes/tournament.routes"));

module.exports = app;