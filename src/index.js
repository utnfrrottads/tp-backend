const express = require("express");
const app = express();
const consign = require('consign');


consign({
    cwd:__dirname
})
    .include('libs/config.js')
    .then('db.js')
    .then('libs/middlewares.js')
    .then('routes')
    .then('libs/boot.js')
    .into(app)





