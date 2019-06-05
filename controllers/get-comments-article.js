const { fetchCommentsByArticle } = require('../models/fetch-comments-article');
const { checkExist } = require('../models/fetch-articles')
exports.getCommentsByArticle = async (req, res, next) => {
 try {
  const comments = await fetchCommentsByArticle(req.params, req.query);
  if (!comments[0]) {
   await checkExist(req.params.article_id, 'articles', 'article_id')
   res.status(200).send({ comments })
  }
  else { res.status(200).send({ comments }) };
 } catch (err) {
  next(err)
 }
}
