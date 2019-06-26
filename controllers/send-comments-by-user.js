const { fetchCommentsByUser } = require('../models/fetch-comments-by-user')
exports.sendCommentsByUser = async (req, res, next) => {
 try {
  const comments = await fetchCommentsByUser(req.params, req.query);
  res.status(200).send({ comments });
 } catch (err) {
  next(err)
 }
}