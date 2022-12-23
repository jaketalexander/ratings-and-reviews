const { Pool } = require('pg')
require('dotenv').config();


const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

pool.connect()

const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}

module.exports = { query }
