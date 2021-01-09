const express = require('express')
const app = express()
const db = require("./models");
const PORT = process.env.PORT || 3000;

const morgan = require('morgan'); // Morgan
app.use(morgan('dev'));

const cors = require('cors'); // CORS
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true })) //application/x-www-form-urlencoded

const apiRoutes = require("./routes/apiRoutes");
app.use("/api", apiRoutes);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  });






