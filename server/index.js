'use strict';

const express = require('express'); 
const app = express();

const morgan = require('morgan');
const {PORT, CLIENT_ORIGIN} =require('../config');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: CLIENT_ORIGIN
}));

const objectsRouter = require('./routes/objects');

app.use('/api/objects', objectsRouter);

app.listen( PORT, function () {
  console.info(` Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


