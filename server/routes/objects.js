'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../utils/knex');


router.get('/', (req, res, next) => {
  knex
    .select('objects.id', 'name', 'description', 
      'image_id as imageId', 
      'images.image_one as imageOne','images.image_two as imageTwo',
      'images.image_three as imageThree','images.image_four as imageFour',
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

router.post( '/', (req, res, next) =>{
  const { 
    name,
    description, 
    location, 
    countryOfOrigin, 
    manufacturer, 
    global, 
    postalCode,
  } = req.body;
  // need to figure out what data i am collecting from images!

  const newObject = {

    
  }

});


module.exports = router;