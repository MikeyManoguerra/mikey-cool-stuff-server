'use strict';

const express = require('express'); 
const app = express();

const morgan = require('morgan');
const {PORT} =require('../config');

app.use(express.json());
app.use(morgan('dev'));


const objectsRouter = require('./routes/objects');

app.use('/api/objects', objectsRouter);

app.listen( PORT, function () {
  console.info(` Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


