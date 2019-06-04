const commentsRouter = require('express').Router();
const { patchCommentByID } = require('../controllers/patch-comment-by-id')
const { methodNotAllowed } = require('../errors');

commentsRouter
 .route('/:comment_id')
 .patch(patchCommentByID)
 .all(methodNotAllowed);

module.exports = commentsRouter;