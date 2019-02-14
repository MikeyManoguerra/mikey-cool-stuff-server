'use strict';

const express = require('express');
const app = express();

const morgan = require('morgan');
const { PORT, CLIENT_ORIGIN } = require('../config');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: CLIENT_ORIGIN
}));

const categoriesRouter = require('./routes/categories');
const objectsRouter = require('./routes/objects');

app.use('/api/objects', objectsRouter);
app.use('/api/categories', categoriesRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

if (require.main === module) {
  app.listen(PORT, function () {
    console.info(` Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app;
