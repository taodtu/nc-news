process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const dbConfig = require('../knexfile');
const connection = require('knex')(dbConfig);

describe.only('/comments', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/comments/:comment_id', () => {
    it('Patch status:200, and return the comment with updated votes', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 7 })
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).to.be.an('object');
          expect(body.comment).to.eql(
            {
              article_id: 9,
              comment_id: 1,
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              author: 'butter_bridge',
              votes: 23,
              created_at: "2017-11-22T12:36:03.389Z",
            }
          );
        });
    });
    it('PATCH for an invalid comment_id - status:400 and error message', () => {
      return request(app)
        .patch('/api/comments/star')
        .send({ inc_votes: 7 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('PATCH for an non-exsting comments_id - status:404 and error message', () => {
      return request(app)
        .patch('/api/comments/1123')
        .send({ inc_votes: 7 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Comment Not Found');
        });
    });
    it('PATCH for an invalid body key - status:400 and error message', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ article_id: 'star' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
        });
    });
    it('PATCH for an invalid body value - status:400 and error message', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 'star' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
        });
    });
    it('post a new vote - status:405 and Method Not Allowed', () => {
      return request(app)
        .post('/api/comments/1')
        .send({ inc_votes: 2 })
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal('Method Not Allowed');
        });
    });
    it('Delete status:200, and return the delete message', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).to.equal('comment 1 deleted :(');
        });
    });
    it('Delete for an invalid comment_id - status:400 and error message', () => {
      return request(app)
        .delete('/api/comments/star')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('Delete for non-exsiting valid comment_id - status:400 and error message', () => {
      return request(app)
        .delete('/api/comments/9999')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Invalid ID');
        });
    });
  });
});