require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./database/db-connection');

const PORT = process.env.PORT || 8080;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});