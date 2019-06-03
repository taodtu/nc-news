const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendUserByID } = require('../controllers/send-user-by-id')

usersRouter
 .route('/:username')
 .get(sendUserByID)
 .all(methodNotAllowed);

module.exports = usersRouter;