process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('/comments', () => {
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
 });
});