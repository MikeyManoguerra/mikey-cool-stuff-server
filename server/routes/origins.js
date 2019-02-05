'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../utils/knex');

//get route for form

// validation happens on objects form!, (???)
const postAnOrigin = (obj) => {
  const { country, global } = obj;
  const newOrigin = {
    country,
    global
  };
  // need to get the location LAT LON data here
  knex('origins')
    .insert(newOrigin,['origins.id', 'country'])
    .then(([results]) => {
      if(results){
        console.log(results);
      }
    });
}  
  
module.exports = postAnOrigin;