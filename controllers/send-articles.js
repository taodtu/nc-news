const { fetchArticles } = require('../models/fetch-articles');
exports.sendArticles = async (req, res, next) => {
 try {
  const articles = await fetchArticles(req.query);
  res.status(200).send({ articles });
 } catch (err) {
  next(err)
 }
}
