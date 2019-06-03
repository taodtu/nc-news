const commentsRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');

commentsRouter
 .route('/')
 .get((req, res) => res.send({ ok: true }))
 .all(methodNotAllowed);

module.exports = commentsRouter;