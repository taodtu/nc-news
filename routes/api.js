const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const topicsRouter = require('./topic-router')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter)

module.exports = apiRouter;
