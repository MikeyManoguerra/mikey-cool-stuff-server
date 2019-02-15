'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');
const knex = require('../utils/knex');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Noteful API', function () {
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
});

// TODO ('keep the to db sql files in sync');