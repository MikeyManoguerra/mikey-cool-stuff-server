'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
module.exports = {
  PORT,
  CLIENT_ORIGIN
}; 