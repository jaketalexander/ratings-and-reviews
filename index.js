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

app.get(“/loaderio-5dcdf417719abd0b18c776b964f9a420”, (req, res) => res.send(“loaderio-5dcdf417719abd0b18c776b964f9a420”))

// app.use(express.static(__dirname + '/../client'));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})