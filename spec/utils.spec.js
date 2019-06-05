const { expect } = require("chai");
const { format } = require("../utils/format");

describe("format", () => {
 const articles = [
  {
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
  belongs_to: "They're not exactly dogs, are they?",
  created_by: 'butter_bridge',
  votes: 16,
  created_at: 1511354163389,
 }]
 it("returns an new empty array when passed an empty array of films", () => {
  const shops = [];
  const ref = {};
  const actual = formatshop(ref, shops);
  const expected = [];
  expect(actual).to.eql(expected);
  expect(actual).to.not.equal(shops);
 });
 it("return and contains all correct keys", () => {
  let shops = [
   {
    shop_name: "Goodwin - McClure",
    owner: "Derek",
    slogan: "Organic directional matrix"
   }
  ];
  const ref = {};
  const actual = formatshop(ref, shops);
  expect(shops[0]).to.contain.keys("shop_name", "owner", "slogan");
  expect(actual[0]).to.not.equal(shops);
 });
 it("each shop should take a ref as well a return a new shop with owner_id", () => {
  const shopData = [
   {
    shop_name: "Goodwin - McClure",
    owner: "Derek",
    slogan: "Organic directional matrix"
   }
  ];
  const ref = { Derek: 1 };
  const actual = formatshop(ref, shopData);
  const expected = {
   shop_name: "Goodwin - McClure",
   owner_id: 1,
   slogan: "Organic directional matrix"
  };
  expect(actual[0]).to.eql(expected);
  expect(actual[0]).to.not.equal(shopData);
 });
});
