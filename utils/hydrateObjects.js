'use strict';

function hydrateObjects(input) {
  const hydrated = [];
  const lookup = {};
  for (let object of input) {

    if (!lookup[object.id]) {
      lookup[object.id] = object;
      lookup[object.id].categories = [];
      hydrated.push(lookup[object.id]);
    
    }
    if (object.categoryId && object.categoryName) {
      lookup[object.id].categories.push({
        id: object.categoryId,
        name: object.categoryName
      });
    }
    delete lookup[object.id].categoryId;
    delete lookup[object.id].categoryName;
  }
  return hydrated;
}
module.exports = hydrateObjects;