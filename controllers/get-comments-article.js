const { fetchCommentsByArticle } = require('../models/fetch-comments-article');
exports.getCommentsByArticle = async (req, res, next) => {
 try {
  const comments = await fetchCommentsByArticle(req.params, req.query);
  if (!comments) await Promise.reject({ status: 404, msg: 'comments Not Found' })
  res.status(200).send({ comments });
 } catch (err) {
  next(err)
 }
}
