'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const CLIENT_ORIGIN =  process.env.CLIENT_ORIGIN || 'http://localhost:3000';
module.exports ={ 
  PORT,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
  CLIENT_ORIGIN
}; 