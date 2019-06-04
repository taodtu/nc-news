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
});