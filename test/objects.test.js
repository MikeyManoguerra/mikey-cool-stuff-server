'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const knex = require('../utils/knex');

const expect = chai.expect;
chai.use(chaiHttp);

describe('objects API endpoint test', function () {
  const seedData = require('../db/seed-data');

  beforeEach(function () {
    return seedData('./db/objectsdb.sql');
  });

  after(function () {
    return knex.destroy(); // destroy the connection
  });

  describe('GET /api/objects', function () {
    it('should return 5 objects', function () {
      return chai.request(app)
        .get('/api/objects')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(5);
        });
    });
  });

  describe('POST /api/objects', function () {
    it('should post an object that has all good data', function () {
      const newObject = {
        name: 'magnifying glass',
        description: 'it has a black handle and a glass magnifier',
        countryOfOrigin: 'germany',
        manufacturer: null,
        global: null,
        postalCode: 12345,
        newCategory: 'espionage',
        categoryIds: [12, 11, 10],
        image: 'https://example.org',
        capital: 'Berlin'
      };

      let res;
      return chai.request(app)
        .post('/api/objects')
        .send(newObject)
        .then(function (_res) {
          res = _res;
          expect(res).to.be.json;
          expect(res).to.have.status(201);
          expect(res.body.name).to.equal('magnifying glass');
          return knex.select('name', 'id')
            .from('objects')
            .where('objects.id', res.body.id);
        })
        .then(function ([data]) {
          expect(res.body.id).to.equal(data.id);
        });
    });
  });
});

// TODO ('keep the to db sql files in sync');