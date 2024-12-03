const mongoose = require('mongoose')
require('dotenv').config()

const MongoDB = process.env.MongoDB_URI

const initializeDatabase = async() =>
{
  try { 
    const connection =await mongoose.connect(MongoDB)
    if (connection)
    {
      console.log('Connected Successfully')
    }
  }
  catch (error)
  {
console.log('Connection Failed',error)
  }
}

module.exports = {initializeDatabase}