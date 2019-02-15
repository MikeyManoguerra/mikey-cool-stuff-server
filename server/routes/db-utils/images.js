'use strict';

const knex = require('../../../utils/knex');



const addImageUrlToDb = (obj) => {
  const { image } = obj;
  if (image) {
    const newImagesObject = {};
    newImagesObject.image_one = image;
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