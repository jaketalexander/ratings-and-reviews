const express = require('express')
const app = express()
const port = 3000
const db = require('./db/index.js')
const logger = require('./middleware/logger.js');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(logger);


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})