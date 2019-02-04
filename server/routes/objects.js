'use strict';
const express = require('express');

const router = express.Router();

const knex = require ('../../utils/knex');


router.get('/', (req, res, next) => {
  knex
    .select('objects.id', 'name')
    .from('objects')
    .orderBy('objects.id')
    .then( result =>{
      if(result){
        res.json(result);
      } else{
        next ();
      }
    })
    .catch(err => next(err));
});

module.exports = router;