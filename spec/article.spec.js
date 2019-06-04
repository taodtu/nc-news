process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const dbConfig = require('../knexfile');
const connection = require('knex')(dbConfig);

describe('/articles', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/articles/:article_id', () => {
    it('GET status:200, and return the article by article_id', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article).to.be.an('object');
          expect(body.article).to.eql(
            {
              article_id: 1,
              title: 'Living in the shadow of a great man',
              topic: 'mitch',
              author: 'butter_bridge',
              body: 'I find this existence challenging',
              created_at: "2018-11-15T12:21:54.171Z",
              votes: 100,
            }
          );
        });
    });
    it('GET for an invalid article_id - status:400 and error message', () => {
      return request(app)
        .get('/api/articles/star')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('GET for a non-exsiting valid article_id - status:404 and error message', () => {
      return request(app)
        .get('/api/articles/1123')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Article Not Found');
        });
    });
  });
  describe('/articles/:article_id/comments', () => {
    it('GET status:200, and return an array of comments belongs to this article with proper keys', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an('array');
          expect(body.comments[0]).to.contain.keys(
            'article_id',
            'author',
            'body',
            'created_at',
            'votes',
          );
        });
    });
    it('GET status:200, and return an array of comments with order', () => {
      return request(app)
        .get('/api/articles/1/comments?sort_by=votes&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an('array');
          expect(body.comments[0]).to.eql(
            {
              comment_id: 4,
              author: 'icellusedkars',
              article_id: 1,
              body: ' I carry a log — yes. Is it funny to you? It is not to me.',
              votes: -100,
              created_at: '2014-11-23T12:36:03.389Z'
            }
          );
        });
    });
  });
  describe('/articles', () => {
    it('GET status:200 and return all the articles with all the keys', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles[0]).to.contain.keys(
            'author',
            'title',
            'article_id',
            'topic',
            'created_at',
            'votes',
            'comment_count'
          );
        });
    });
  });
});