/*
* Conexion a MongoDB
*/

"use strict";

const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const  dbConnection = async () => {
  try{

    await mongoose.connect(process.env.URL_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected!')

  }catch (error){

    console.log(error)
    throw new Error('Error connecting mongodb ');

  }
}
module.exports = dbConnection;
