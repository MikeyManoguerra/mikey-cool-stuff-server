'use strict';
const cloudinary = require('cloudinary');
const { CLOUD_NAME, API_KEY, API_SECRET } = require('../../../config');

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const uploadImageToCloudinary = (image) => {
  cloudinary.v2.uploader.upload(image, (error, result) => {
    console.log(result, error);
  });
};

module.exports = uploadImageToCloudinary;