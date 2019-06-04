process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

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
        .get('/api/articles/porn')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('GET for an invalid username - status:404 and error message', () => {
      return request(app)
        .get('/api/articles/1123')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Article Not Found');
        });
    });
  });
  describe('/articles/:article_id', () => {
    it('Patch status:200, and return the article with updated votes', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: -7 })
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
              votes: 93,
            }
          );
        });
    });
    it('PATCH for an invalid article_id - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/porn')
        .send({ article_id: 'porn' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('PATCH for an non-exsting article_id - status:404 and error message', () => {
      return request(app)
        .patch('/api/articles/1123')
        .send({ article_id: 1123 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Article Not Found');
        });
    });
    it('PATCH for an invalid body key - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ article_id: 'porn' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
        });
    });
    it('PATCH for an invalid body value - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 'porn' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
  });
  describe('/articles/:article_id/comments', () => {
    it('POST status:200, and return the comment with proper keys', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({
          username: 'butter_bridge',
          body: 'I want to become a pornstar'
        })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.be.an('object');
          expect(body.comment).to.include(
            {
              author: 'butter_bridge',
              comment_id: 19,
              votes: 0,
              article_id: 1,
              body: 'I want to become a pornstar'
            }
          );
        });
    });
    it('POST for an invalid article_id - status:400 and error message', () => {
      return request(app)
        .post('/api/articles/porn/comments')
        .send({ article_id: 'porn' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('POST for a non-exist article_id - status:400 and error message', () => {
      return request(app)
        .post('/api/articles/1123/comments')
        .send({ article_id: 1123 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('POST for an invalid body key - status:400 and error message', () => {
      return request(app)
        .post('/api/articles/1/comments')
        .send({ article_id: 'porn' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
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
    it.only('GET status:200, and return an array of comments with order', () => {
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