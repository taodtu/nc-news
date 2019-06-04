const { insertCommentToArticle } = require('../models/inser-comment-article');
exports.postCommentToArticle = async (req, res, next) => {
 try {
  const comment = await insertCommentToArticle(req.params, req.body);
  if (!req.body.username || !req.body.body) await Promise.reject({ status: 400, msg: 'Wrong Update Input' })
  res.status(200).send({ comment });
 } catch (err) {
  next(err)
 }
}
