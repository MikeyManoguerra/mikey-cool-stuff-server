'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const knex = require('../utils/knex');

const expect = chai.expect;
chai.use(chaiHttp);

describe('categories API endpoint test', function () {
  const seedData = require('../db/seed-data');

  beforeEach(function () {
    return seedData('./db/objectsdb.sql');
  });

  // after(function () {
  //   return knex.destroy(); // destroy the connection
  // });

  describe('GET api/categories', function () {
    it('should return a list of categories and ids', function () {
      return chai.request(app)
        .get('/api/categories')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.length(7);
          expect(res.body[Math.floor(Math.random() * (res.body.length))])
            .to.have.keys('name', 'id');
        });
    });
  });
});
