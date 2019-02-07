'use strict';
const knex = require('../../../utils/knex');


const addManufacturerToDb = (obj) => {
  const { corp } = obj;
  if (corp) {
    const newManufacturer = { corp };

    return knex('manufacturers')
      .insert(newManufacturer, ['manufacturers.id', 'corp'])
      .then(([results]) => {
        if (results) {
          return results;
        }
      });
  } else return {id : null};

};

module.exports = addManufacturerToDb;