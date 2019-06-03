const articlesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendArticles } = require('../controllers/send-articles')

articlesRouter
 .route('/')
 .get(sendArticles)
 .all(methodNotAllowed);

module.exports = articlesRouter;