'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../utils/knex');
const postAnOrgin = require('./origins');


router.get('/', (req, res, next) => {
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
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});


router.get('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {
  const {
    name,
    description,
    countryOfOrigin,
    manufacturer,
    global,
    postalCode,


  } = req.body;
  // need to figure out what data i am collecting from images!
  //and categories

  const newObject = {
    name,
    description,
    country: countryOfOrigin,
    postal_code: postalCode,
    manufacturer: manufacturer,
    global,
  };
console.log(newObject);
  if (!newObject.name) {
    const err = new Error(' please provide a name for your object posting');
    err.status = 400;
    next(err);
  }

  if (!newObject.postal_code) {
    const err = new Error(' please provide a zipcode location, so we can map your object!');
    err.status = 400;
    next(err);
  }

  postAnOrgin(newObject);


  //third validation checking to make sure if 
  //people want to leave other parts of the form blank
});


module.exports = router;