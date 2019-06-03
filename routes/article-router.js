const articlesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendArticles } = require('../controllers/send-articles');
const { sendArticleByID } = require('../controllers/send-article-by-id')

articlesRouter
 .route('/')
 .get(sendArticles)
 .all(methodNotAllowed);

articlesRouter
 .route('/:article_id')
 .get(sendArticleByID)
 .all(methodNotAllowed);

module.exports = articlesRouter;