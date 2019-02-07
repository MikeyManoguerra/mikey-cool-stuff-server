'use strict';
const knex = require('../../../utils/knex');

const addOriginToDb = (obj) => {

  const { country, global } = obj;
  if (country) {
    const newOrigin = {
      country,
      global
    };

    return knex('origins')
      .insert(newOrigin, ['origins.id', 'country'])
      .then(([results]) => {
        if (results) {
          return results;
        }
      });
  } else return {id : null};
};

module.exports = addOriginToDb;