const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const topicsRouter = require('./topic-router');
const usersRouter = require('./user-router');
const articlesRouter = require('./article-router');
const commentsRouter = require('./comment-router')
const fs = require('fs');

apiRouter
  .route('/')
  .get((req, res, next) => {
    fs.readFile('./api.json', 'utf8', (err, api) => {
      res.status(200).send({ api: JSON.parse(api) });
    })
  })
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
