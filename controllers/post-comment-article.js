const { insertCommentToArticle } = require('../models/inser-comment-article');
const { checkExist } = require('../models/fetch-articles');
exports.postCommentToArticle = async (req, res, next) => {
 try {
  if (Object.keys(req.body).length > 2 || !req.body.username || !req.body.body) await Promise.reject({ status: 400, msg: 'Wrong Update Input' })
  const comment = await insertCommentToArticle(req.params, req.body);
  res.status(201).send({ comment });
 } catch (err) {
  next(err)
 }
}
