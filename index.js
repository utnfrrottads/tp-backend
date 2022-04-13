// imports
const mongoose = require("mongoose");
const app = require("./app");
// load dotenv
require("dotenv").config();

const port = 3700;
// connect to database and launch app in case it succeeds
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.CONN_STRING)
  .then(() => {
    console.log("Connected to database succesfully...");

    // Creacion del servidor
    app.listen(port, () => {
      console.log(`Server running at: localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
