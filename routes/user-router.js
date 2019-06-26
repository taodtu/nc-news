const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendUserByID } = require('../controllers/send-user-by-id');
const { sendCommentsByUser } = require('../controllers/send-comments-by-user')

usersRouter
 .route('/:username')
 .get(sendUserByID)
 .all(methodNotAllowed);

usersRouter
 .route('/:username/comments')
 .get(sendCommentsByUser)
 .all(methodNotAllowed);

module.exports = usersRouter;