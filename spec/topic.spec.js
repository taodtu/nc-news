process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/topics', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it('GET status:200 and return all the topics with slug and description key', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        expect(body.topics).to.be.an('array');
        expect(body.topics[0]).to.contain.keys(
          'slug',
          'description'
        );
      });
  });
});