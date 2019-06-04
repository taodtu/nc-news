const { fetchCommentsByArticle } = require('../models/fetch-comments-article');
exports.getCommentsByArticle = async (req, res, next) => {
 const comments = await fetchCommentsByArticle(req.params);
 res.status(200).send({ comments });
}
