const { updateCommentByID } = require('../models/update-comment-by-id');

exports.patchCommentByID = async (req, res, next) => {
 try {
  if (Object.keys(req.body).length === 0) {
   const [comment] = await updateCommentByID(req.params, req.body);
   res.status(200).send({ comment });
  }
  if (isNaN(req.body.inc_votes)) await Promise.reject({ status: 400, msg: 'Wrong Update Input' })
  const [comment] = await updateCommentByID(req.params, req.body);
  if (!comment) await Promise.reject({ status: 404, msg: 'Comment Not Found' })
  res.status(200).send({ comment });
 } catch (err) {
  next(err)
 }
}
