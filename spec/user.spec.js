process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/users/:username', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it('GET status:200, and return the user by username', () => {
    return request(app)
      .get('/api/users/rogersop')
      .expect(200)
      .then(({ body }) => {
        expect(body.user).to.be.an('object');
        expect(body.user).to.eql(
          {
            username: 'rogersop',
            name: 'paul',
            avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
          }
        );
      });
  });
  it('GET for an invalid username - status:404 and error message', () => {
    return request(app)
      .get('/api/users/23')
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal('User Not Found');
      });
  });
  it('POST for a new user - status:405 and Method Not Allowed', () => {
    return request(app)
      .post('/api/users/pornstar')
      .send({ username: 'pornstar' })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal('Method Not Allowed');
      });
  });
});