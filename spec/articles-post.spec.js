const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

exports.testArticlesPost = () => {
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
}

