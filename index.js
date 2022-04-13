let mongoose = require("mongoose");
let app = require("./app");
require("dotenv").config();

let port = 3700;

mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.x9bfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to database succesfully...");

    // Creacion del servidor
    app.listen(port, () => {
      console.log(`Server running at: localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
