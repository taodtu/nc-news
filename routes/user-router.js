const usersRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');

usersRouter
 .route('/')
 .get((req, res) => res.send({ ok: true }))
 .all(methodNotAllowed);

module.exports = usersRouter;