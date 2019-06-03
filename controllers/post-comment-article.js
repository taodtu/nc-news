const { insertCommentToArticle } = require('../models/inser-comment-article');
exports.postCommentToArticle = async (req, res, next) => {
 const comment = await insertCommentToArticle(req.params, req.body);
 res.status(200).send({ comment });
}
