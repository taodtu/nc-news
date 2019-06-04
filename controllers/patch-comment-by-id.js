const { updateCommentByID } = require('../models/update-comment-by-id');
exports.patchCommentByID = async (req, res, next) => {
 try {
  const [comment] = await updateCommentByID(req.params, req.body);
  if (!comment) await Promise.reject({ status: 404, msg: 'Comment Not Found' })
  if (!req.body.inc_votes) await Promise.reject({ status: 400, msg: 'Wrong Update Input' })
  res.status(200).send({ comment });
 } catch (err) {
  next(err)
 }
}
