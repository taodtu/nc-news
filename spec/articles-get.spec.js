const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const chai = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);

exports.testArticlesGet = () => {
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
    it('GET status:200 and return all the articles belongs to a author', () => {
      return request(app)
        .get('/api/articles?author=butter_bridge')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.eql(
            [{
              article_id: 1,
              title: 'Living in the shadow of a great man',
              body: 'I find this existence challenging',
              votes: 100,
              topic: 'mitch',
              author: 'butter_bridge',
              created_at: '2018-11-15T12:21:54.171Z',
              comment_count: 13
            },
            {
              article_id: 9,
              title: "They're not exactly dogs, are they?",
              body: 'Well? Think about it.',
              votes: 0,
              topic: 'mitch',
              author: 'butter_bridge',
              created_at: '1986-11-23T12:21:54.171Z',
              comment_count: 2
            },
            {
              article_id: 12,
              title: 'Moustache',
              body: 'Have you seen the size of that thing?',
              votes: 0,
              topic: 'mitch',
              author: 'butter_bridge',
              created_at: '1974-11-26T12:21:54.171Z',
              comment_count: 0
            }]
          );
        });
    });
    it('GET status:200 and return all the articles belongs to a author and a topic', () => {
      return request(app)
        .get('/api/articles?topic=cats')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an('array');
          expect(body.articles).to.eql(
            [{
              article_id: 5,
              title: 'UNCOVERED: catspiracy to bring down democracy',
              body: 'Bastet walks amongst us, and the cats are taking arms!',
              votes: 0,
              topic: 'cats',
              author: 'rogersop',
              created_at: '2002-11-19T12:21:54.171Z',
              comment_count: 2
            }]
          );
        });
    });
    it('GET status:404 when request an author not in the databse', () => {
      return request(app)
        .get('/api/articles?author=cats&topic=mitch')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Not Found');
        });
    });
    it('GET status:404 when request an topic not in the databse', () => {
      return request(app)
        .get('/api/articles?author=cats&topic=tao')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Not Found');
        });
    });
    it('GET status:200 when request an author in DB with no articles', () => {
      return request(app)
        .get('/api/articles?author=lurker')
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.eql([]);
        });
    });
  });
}