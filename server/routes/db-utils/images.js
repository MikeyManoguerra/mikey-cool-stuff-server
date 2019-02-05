'use strict';

const knex = require('../../../utils/knex');



const addImageUrlToDb = (arr = []) => {
  if (arr.length !== 0) {
    const newImagesObject = {};
    newImagesObject.image_one = arr[0];
    newImagesObject.image_two = arr[1] || null;
    newImagesObject.image_three = arr[2] || null;
    newImagesObject.image_four = arr[3] || null;


    return knex('images')
      .insert(newImagesObject)
      .returning('images.id')
      .then(([results]) => {
        if (results) {
          return results;
        }
      });
  } else return;
};

module.exports = addImageUrlToDb;