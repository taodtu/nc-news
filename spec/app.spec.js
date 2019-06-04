process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const dbConfig = require('../knexfile');
const connection = require('knex')(dbConfig);
const { testArticlePatch } = require('./articles-patch.spec');
const { testArticlesPost } = require('./articles-post.spec');
const { testArticlesGet } = require('./articles-get.spec')

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    it('GET status:200', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    it('GET status:404 for a route not found', () => {
      return request(app)
        .get('/api/house')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Route Not Found');
        });
    });
  });
  testArticlePatch();
  testArticlesPost();
  testArticlesGet();
});
