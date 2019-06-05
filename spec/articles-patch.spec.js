const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

exports.testArticlePatch = () => {
  describe.only('/articles/:article_id', () => {
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
    it('Patch status:200, and return the article when send nothing', () => {
      return request(app)
        .patch('/api/articles/1')
        .send()
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
    it('PATCH for an invalid article_id - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/star')
        .send({ inc_votes: -7 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Bad Request');
        });
    });
    it('PATCH for an non-exsting article_id - status:404 and error message', () => {
      return request(app)
        .patch('/api/articles/1123')
        .send({ inc_votes: -7 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal('Article Not Found');
        });
    });
    it('PATCH for an invalid body key - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ article_id: 'star' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
        });
    });
    it('PATCH for an invalid body value - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({ inc_votes: 'star' })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Wrong Update Input');
        });
    });
    it('PATCH for a body with many keys - status:400 and error message', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({
          inc_votes: 'star',
          name: 'Mitch'
        })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal('Votes Only');
        });
    });
  });
}