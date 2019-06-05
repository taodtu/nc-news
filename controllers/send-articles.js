const { fetchArticles } = require('../models/fetch-articles');
exports.sendArticles = async (req, res, next) => {
 try {
  const articles = await fetchArticles(req.query);
  if (!articles[0]) await Promise.reject({ status: 404, msg: 'Not Found' })
  res.status(200).send({ articles });
 } catch (err) {
  next(err)
 }
}
