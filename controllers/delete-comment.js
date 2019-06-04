const { deleteComment } = require('../models/delete-comment');
exports.deleteCommentByID = async (req, res, next) => {
 try {
  await deleteComment(req.params);
  res.status(200).send({ msg: `comment ${req.params.comment_id} deleted :(` });
 } catch (err) {
  next(err)
 }
}