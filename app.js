require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const usersRouter = require("./routes/users");
const messagesRouter = require('./routes/messages')
const friendRouter = require("./routes/friendList");
const bodyParser = require("body-parser");


// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Chat API</h1><a href="/api/v1/users">Chat route</a>');
});

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/messages", messagesRouter);
app.use("/api/v1/friendList", friendRouter);

<<<<<<< HEAD
=======

// products route
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

>>>>>>> 6273c2e1c8fe56ed1f51c6cf2a741ee50f63caaf
const port = process.env.PORT || 3000;

// func to connectDB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
