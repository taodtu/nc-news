const { fetchArticleByID } = require('../models/fetch-article-by-id');
exports.sendArticleByID = async (req, res, next) => {
 try {
  const article = await fetchArticleByID(req.params);
  if (!article) await Promise.reject({ status: 404, msg: 'Article Not Found' })
  res.status(200).send({ article });
 } catch (err) {
  next(err)
 }
}
