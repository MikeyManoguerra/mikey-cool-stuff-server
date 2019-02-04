'use strict';

const express = require('express'); 
const app = express();
app.use(express.json());

const {PORT} =require('../config');

const objectsRouter = require('./routes/objects');

app.use('/api/objects', objectsRouter);

app.listen( PORT, function () {
  console.info(` Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});


