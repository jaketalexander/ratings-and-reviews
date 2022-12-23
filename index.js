const express = require('express');
const db = require('./db');

// Middleware
const logger = require('./middleware/logger.js');

const app = express();
module.exports.app = app;

const port = 3000;

// Router
var router = require('./routes.js');

//Parsers
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Send Routes
app.use(router)

// app.use(express.static(__dirname + '/../client'));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})