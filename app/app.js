require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connection = require("./config/db");
const databaseHelper = require("./helpers/database.helper");

// Conectamos a la base de datos
connection();

// Carga inicial de la db
if (Number(process.env.RESET_DB)) {
    databaseHelper.resetDatabase();
}

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