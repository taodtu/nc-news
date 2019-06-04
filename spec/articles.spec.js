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
 });
}