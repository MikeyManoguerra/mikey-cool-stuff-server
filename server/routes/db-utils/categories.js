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
  const { categories, categoryIds } = obj;
  const existingCategories = [...categoryIds];
  if (categories) {
    let categoriesArray = [];
    categoriesArray.push(categories);
    const knexArray = categoriesArray.map(category => {
      return { name: category };
    });
    return Promise.all(
      dbActionUsingKnex(knexArray)
    ).then(results => {
      return [...existingCategories, ...results];
    });
  } else if (categoryIds) {
    return [...existingCategories];
  } else return [];
};

module.exports = addCategoriesToDb;