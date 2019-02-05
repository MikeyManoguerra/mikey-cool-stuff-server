'use strict';

const knex = require('../../../utils/knex');



const addlocationToDb = (obj) => {
  const { postal_code } = obj;
  const newLocation = { postal_code };
  // need to get the location LAT LON data here
  return knex('locations')
    .insert(newLocation,['locations.id', 'postal_code'])
    .then(([results]) => {
      if(results){
        return results;
      }
    });

};
  
module.exports = addlocationToDb;