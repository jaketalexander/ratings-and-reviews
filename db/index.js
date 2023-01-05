const { Pool } = require('pg')
require('dotenv').config();


// const pool = new Pool({
//     user: process.env.USER,
//     database: process.env.DATABASE,
//     port: process.env.PORT
// })

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PORT,
})

pool.connect()

const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}

module.exports = { query }
