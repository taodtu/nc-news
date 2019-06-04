const commentsRouter = require('express').Router();
const { patchCommentByID } = require('../controllers/patch-comment-by-id')
const { methodNotAllowed } = require('../errors');
const { deleteCommentByID } = require('../controllers/delete-comment')

commentsRouter
 .route('/:comment_id')
 .patch(patchCommentByID)
 .delete(deleteCommentByID)
 .all(methodNotAllowed);

module.exports = commentsRouter;