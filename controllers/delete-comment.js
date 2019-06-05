const { deleteComment } = require('../models/delete-comment');
exports.deleteCommentByID = async (req, res, next) => {
 try {
  const deleteCount = await deleteComment(req.params);
  deleteCount ?
   res.status(200).send({ msg: `comment ${req.params.comment_id} deleted :(` })
   : await Promise.reject({ status: 400, msg: 'Invalid ID' })
 } catch (err) {
  next(err)
 }
}