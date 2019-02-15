'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../utils/knex');
const addOriginToDb = require('./db-utils/origins');
const addManufacturerToDb = require('./db-utils/manufacturers');
const addLocationToDb = require('./db-utils/locations');
const addCategoriesToDb = require('./db-utils/categories');
const addImageUrlToDb = require('./db-utils/images');
const hydrateObjects = require('../../utils/hydrateObjects');


router.get('/', (req, res, next) => {
  knex
    .select('objects.id', 'objects.name as name', 'description',
      'images.id as imageId',
      'images.image_one as imageOne', 'images.image_two as imageTwo',
      'locations.id as locationId', 'locations.postal_code as postalCode',
      'origins.id as originId', 'origins.country as countryOfOrigin', 'origins.capital as capital',
      'manufacturers.id as manufacturerId', 'manufacturers.corp as manufacturer',
      'categories.id as categoryId', 'categories.name as categoryName')
    .from('objects')
    .leftJoin('images', 'objects.image_id', 'images.id')
    .leftJoin('locations', 'objects.location_id', 'locations.id')
    .leftJoin('origins', 'objects.origin_id', 'origins.id')
    .leftJoin('manufacturers', 'objects.manufacturer_id', 'manufacturers.id')
    .leftJoin('objects_categories', 'objects.id', 'objects_categories.object_id')
    .leftJoin('categories', 'objects_categories.category_id', 'categories.id')
    .orderBy('objects.name')
    .then(result => {
      if (result) {
        const hydrated = hydrateObjects(result);
        res.json(hydrated);
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
    newCategory,
    categoryIds,
    image,
    capital,
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
    capital: capital ? capital : null,
    newCategory: newCategory ? newCategory : null,
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
      return knex('objects')
        .insert(newObject)
        .returning('id');
    })
    .then(([id]) => {

      objectId = id;
      const categoriesInsert = categoryIdArray.map(
        categoryId => {
          return {
            object_id: objectId,
            category_id: categoryId
          };
        });
      return knex.insert(categoriesInsert).into('objects_categories');

    }).then(() => {
      return knex
        .select('objects.id', 'objects.name as name', 'description',
          'images.id as imageId',
          'images.image_one as imageOne', 'images.image_two as imageTwo',
          'locations.id as locationId', 'locations.postal_code as postalCode',
          'origins.id as originId', 'origins.country as countryOfOrigin', 'origins.capital as capital',
          'manufacturers.id as manufacturerId', 'manufacturers.corp as manufacturer',
          'categories.id as categoryId', 'categories.name as categoryName')
        .from('objects')
        .leftJoin('images', 'objects.image_id', 'images.id')
        .leftJoin('locations', 'objects.location_id', 'locations.id')
        .leftJoin('origins', 'objects.origin_id', 'origins.id')
        .leftJoin('manufacturers', 'objects.manufacturer_id', 'manufacturers.id')
        .leftJoin('objects_categories', 'objects.id', 'objects_categories.object_id')
        .leftJoin('categories', 'objects_categories.category_id', 'categories.id')
        .where('objects.id', objectId);
    })
    .then(result => {
      if (result) {
        const hydrated = hydrateObjects(result)[0];
        return res.status(201).json(hydrated);
       
      }

    })
    .catch(err => next(err));
});


module.exports = router;