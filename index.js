// imports
const mongoose = require("mongoose");
const app = require("./app");
// load dotenv
require("dotenv").config();

const PORT = 3700;

// console.clear();

// connect to database and launch app in case it succeeds
mongoose.connect(process.env.CONN_STRING).then(() => {
  
  console.log("Connected to database succesfully...");

  // Creacion del servidor
  app.listen(PORT, () => {
    console.log(`Server running at: localhost:${PORT}`);
  });
}).catch((err) => console.log(err));
