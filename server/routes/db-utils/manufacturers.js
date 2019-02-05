'use strict';
const knex = require('../../../utils/knex');


const addManufacturerToDb = (obj) => {
  const { corp } = obj;
  const newManufacturer = { corp };

  return knex('manufacturers')
    .insert(newManufacturer,['manufacturers.id', 'corp'])
    .then(([results]) => {
      if(results){
        return results;
      }
    });

};
  
module.exports = addManufacturerToDb;