const { updateCommentByID } = require('../models/update-comment-by-id');
exports.patchCommentByID = async (req, res, next) => {
 const [comment] = await updateCommentByID(req.params, req.body);
 res.status(200).send({ comment });
}
