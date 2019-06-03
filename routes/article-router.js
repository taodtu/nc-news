const articlesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');

articlesRouter
 .route('/')
 .get((req, res) => res.send({ ok: true }))
 .all(methodNotAllowed);

module.exports = articlesRouter;