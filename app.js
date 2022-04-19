const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const usersRouter = require("./routes/users");
// const notFoundMiddleware = require('./middleware/not-found');
// const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Chat API</h1><a href="/api/v1/users">Chat route</a>');
});

app.use("/api/v1/users", usersRouter);

// products route
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);

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
