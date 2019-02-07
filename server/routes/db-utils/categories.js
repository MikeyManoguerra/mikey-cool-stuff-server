'use strict';

const knex = require('../../../utils/knex');


const dbActionUsingKnex = (arr) => {
  const idArray = arr.map(category => {
    return knex('categories')
      .insert(category)
      .returning('categories.id')
      .then(([id]) => id);
  });
  return idArray;
};

const addCategoriesToDb = (obj) => {
  const { categories } = obj;

  if (categories) {
    const knexArray = categories.map(category => {
      return { name: category };
    });
    return Promise.all(
      dbActionUsingKnex(knexArray)
    ).then(results => {
      return results;
    });
  } else return [];
};
module.exports = addCategoriesToDb;