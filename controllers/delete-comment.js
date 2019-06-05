const { deleteComment } = require('../models/delete-comment');
exports.deleteCommentByID = async (req, res, next) => {
  try {
    const deleteCount = await deleteComment(req.params);
    deleteCount ?
      res.sendStatus(204)
      : await Promise.reject({ status: 404, msg: 'Not Found' })
  } catch (err) {
    next(err)
  }
}