'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../utils/knex');
const addOriginToDb = require('./db-utils/origins');
const addManufacturerToDb = require('./db-utils/manufacturers');
const addLocationToDb = require('./db-utils/locations');
const addCategoriesToDb = require('./db-utils/categories');
const addImageUrlToDb = require('./db-utils/images');

router.get('/', (req, res, next) => {
  console.log('hit the endpoint');
  knex
    .select('objects.id', 'name', 'description',
      'image_id as imageId',
      'images.image_one as imageOne', 'images.image_two as imageTwo',
      'images.image_three as imageThree', 'images.image_four as imageFour',
      'location_id as locationId', 'locations.postal_code as postalCode',
      'origin_id as originId', 'origins.country as countryOfOrigin',
      'manufacturer_id as manufacturerId', 'manufacturers.corp as manufacturer')
    .from('objects')
    .leftJoin('images', 'objects.image_id', 'images.id')
    .leftJoin('locations', 'objects.location_id', 'locations.id')
    .leftJoin('origins', 'objects.origin_id', 'origins.id')
    .leftJoin('manufacturers', 'objects.manufacturer_id', 'manufacturers.id')
    // .leftJoin('objects_categories', 'objects.id', 'objects_categories.object_id')
    .orderBy('objects.id')
    .then(result => {
      if (result) {
        console.log(result);
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const {
    name,
    description,
    countryOfOrigin,
    manufacturer,
    global,
    postalCode,
    categories,
    categoryIds,
    image
  } = req.body;

  const newObject = {
    name,
    description,
  };

  const dbDataObject = {
    country: countryOfOrigin ? countryOfOrigin : null,
    postal_code: postalCode,
    corp: manufacturer ? manufacturer : null,
    global,
    categories: categories ? categories : null,
    categoryIds: categoryIds ? categoryIds : null,
    image: image ? image : null
  };

  if (!newObject.name) {
    const err = new Error(' please provide a name for your object posting');
    err.status = 400;
    next(err);
  }

  if (!dbDataObject.postal_code) {
    const err = new Error(' please provide a zipcode location, so we can map your object!');
    err.status = 400;
    next(err);
  }

  //third validation checking to make sure if 
  //people want to leave other parts of the form blank

  const originData = addOriginToDb(dbDataObject);
  const manufacturerData = addManufacturerToDb(dbDataObject);
  const locationData = addLocationToDb(dbDataObject);
  const categoriesData = addCategoriesToDb(dbDataObject);
  const imageData = addImageUrlToDb(dbDataObject);

  let objectId;
  let categoryIdArray = [];


  Promise.all([
    originData,
    manufacturerData,
    locationData,
    categoriesData,
    imageData
  ])
    .then(([origin, manufacturer, location, categoriesData, imageId]) => {

      newObject.origin_id = origin.id;
      newObject.manufacturer_id = manufacturer.id;
      newObject.location_id = location.id;
      newObject.image_id = imageId,
      categoryIdArray = [...categoriesData];
    })
    .then(() => {
      console.log(newObject);
      return knex('objects')
        .insert(newObject)
        .returning('id');
    })
    .then(([id]) => {
      if (categoryIdArray.length > 0) {
        objectId = id;
        const categoriesInsert = categoryIdArray.map(
          categoryId => {
            return {
              object_id: objectId,
              category_id: categoryId
            };
          });
        return knex.insert(categoriesInsert).into('objects_categories');
      }
    })
    .then(() =>
      res.status(204).end()
    )
    .catch(err => next(err));
});


module.exports = router;