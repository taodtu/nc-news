const articlesRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { sendArticles } = require('../controllers/send-articles');
const { sendArticleByID } = require('../controllers/send-article-by-id');
const { patchArticleByID } = require('../controllers/patch-article-by-id');
const { postCommentToArticle } = require('../controllers/post-comment-article');
const { getCommentsByArticle } = require('../controllers/get-comments-article')

articlesRouter
 .route('/')
 .get(sendArticles)
 .all(methodNotAllowed);

articlesRouter
 .route('/:article_id')
 .get(sendArticleByID)
 .patch(patchArticleByID)
 .all(methodNotAllowed);

articlesRouter
 .route('/:article_id/comments')
 .get(getCommentsByArticle)
 .post(postCommentToArticle)
 .all(methodNotAllowed);

module.exports = articlesRouter;