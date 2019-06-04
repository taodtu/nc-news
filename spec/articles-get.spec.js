const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

exports.testArticlesGet = () => {
  describe.only('/articles', () => {
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
    it('GET status:404 for a route not found', () => {
      return request(app)
        .get('/api/article')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Route Not Found');
        });
    });
    it('Delete all articles - status:405 and Method Not Allowed', () => {
      return request(app)
        .delete('/api/articles')
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('Method Not Allowed');
        });
    });
    it('GET status:200, and return an array of articles with default order', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.be.descendingBy("created_at")
        });
    });
    it('GET status:200, and return an array of articles with input order', () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=asc')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.be.ascendingBy("votes")
        });
    });
    it("GET for sort_by a column that doesn't exist - status:400 and error message", () => {
      return request(app)
        .get('/api/articles?sort_by=star&order=asc')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it("GET for order doesn't exist - status:400 and error message", () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=xasc')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Order Query');
        });
    });
  });
}