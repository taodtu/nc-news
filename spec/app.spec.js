process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

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
    describe('/topics', () => {
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
    describe('/users/:username', () => {
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
    });
    describe('/articles/:article_id/comments', () => {
      it('GET status:200, and return an array of comments belongs to this article with proper keys', () => {
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
    });
    describe('/topics', () => {
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
});
