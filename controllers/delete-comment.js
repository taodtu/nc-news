const { deleteComment } = require('../models/delete-comment');
exports.deleteCommentByID = async (req, res, next) => {
  try {
    const deleteCount = await deleteComment(req.params);
    deleteCount ?
      res.sendStatus(204)
      : await Promise.reject({ status: 400, msg: 'Invalid ID' })
  } catch (err) {
    next(err)
  }
}