process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const dbConfig = require('../knexfile');
const connection = require('knex')(dbConfig);
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

describe('/articles', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/articles/:article_id', () => {
    it.only('GET status:200, and return the article by article_id', () => {
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
              comment_count: 13
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
    it('GET for an invalid article_id - status:400 and error message', () => {
      return request(app)
        .get('/api/articles/star/comments')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('GET for a non-exsiting valid article_id - status:404 and error message', () => {
      return request(app)
        .get('/api/articles/1123/comments')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Comments Not Found');
        });
    });
  });
  it('GET status:200, and return an array of comments with default order', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments).to.be.descendingBy("created_at")
      });
  });
  it('GET status:200, and return an array of comments with input order', () => {
    return request(app)
      .get('/api/articles/1/comments?sort_by=votes&order=asc')
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).to.be.an('array');
        expect(body.comments).to.be.ascendingBy("votes")
      });
  });
  it("GET for sort_by a column that doesn't exist - status:400 and error message", () => {
    return request(app)
      .get('/api/articles/1/comments?sort_by=slug&order=asc')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.equal('Bad Request');
      });
  });
  it("GET for order doesn't exist - status:400 and error message", () => {
    return request(app)
      .get('/api/articles/1/comments?sort_by=votes&order=xasc')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.equal('Wrong Order Query');
      });
  });
});

