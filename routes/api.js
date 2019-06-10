const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const topicsRouter = require('./topic-router');
const usersRouter = require('./user-router');
const articlesRouter = require('./article-router');
const commentsRouter = require('./comment-router')
const { apiDescription } = require('../api-des')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true, api: apiDescription.apiDescription }))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
