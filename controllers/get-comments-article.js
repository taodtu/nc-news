const { fetchCommentsByArticle } = require('../models/fetch-comments-article');
exports.getCommentsByArticle = async (req, res, next) => {
 try {
  const comments = await fetchCommentsByArticle(req.params, req.query);
  if (!comments[0]) await Promise.reject({ status: 404, msg: 'Comments Not Found' })
  res.status(200).send({ comments });
 } catch (err) {
  next(err)
 }
}
