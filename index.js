const express = require('express');
const db = require('./db');

// Middleware
var morgan = require('morgan')

const app = express();
// module.exports.app = app;

const port = 3000;

// Router
var router = require('./routes.js');

//Parsers
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Send Routes
app.use(router)

// app.use(express.static(__dirname + '/../client'));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})