const { Pool } = require('pg')
require('dotenv').config();

const connectDB = async () => {
  try {
    const pool = new Pool({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.PORT
    })
    await pool.connect()
    console.log("Connected")
  } catch (error) {
    console.log(error)
  }
}
connectDB();