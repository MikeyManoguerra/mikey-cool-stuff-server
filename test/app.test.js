'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/index');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Reality Check', () => {
  it('true should be true', () => {
    expect(true).to.be.true;
  });
  it('2 + 3 should equal 5', () => {
    expect(2 + 3).to.equal(5);
  });
});

describe('Environment', () => {
  it('NODE_ENV should be "test"', () => {
    expect(process.env.NODE_ENV).to.equal('test');
  });
});

describe('Basic Express setup', () => {
  describe('404 handler', () => {
    it('should respond with 404 when given a bad path', () => {
      return chai.request(app)
        .get('/bad/path')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
  });
});
