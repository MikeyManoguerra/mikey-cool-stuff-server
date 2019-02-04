'use strict';

const express = require('express'); 
const app = express();
app.use(express.json());

app.get('/', (req, res, next) =>{
  console.log('hello world');
  res.json('hi');
  next();
});


app.listen( 8080, function () {
  console.info(` Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});

