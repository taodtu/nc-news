const { expect } = require("chai");
const { format } = require("../utils/format");

describe("format", () => {
 const articles = [
  {
   article_id: 3,
   title: 'Living in the shadow of a great man',
   topic: 'mitch',
   author: 'butter_bridge',
   body: 'I find this existence challenging',
   created_at: 1542284514171,
   votes: 100,
  }]
 const comments = [{
  body:
   "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
  belongs_to: 'Living in the shadow of a great man',
  created_by: 'butter_bridge',
  votes: 16,
  created_at: 1511354163389,
 }]
 it("returns an new empty array when passed  empty arrays", () => {
  const arr1 = [];
  const arr2 = [];
  const actual = format(arr1, arr2);
  const expected = [];
  expect(actual).to.eql(expected);
  expect(actual).to.not.equal(arr1)
  expect(actual).to.not.equal(arr2);
 });
 it("return and contains all correct keys and article_id correlate to articles", () => {
  const actual = format(articles, comments, "title", "article_id", "belongs_to");
  expect(actual[0]).to.contain.keys("body", "article_id", "votes", "created_at", 'created_by');
  expect(actual[0]).to.not.equal(comments);
  expect(actual[0].article_id).to.equal(3);
 });
});
