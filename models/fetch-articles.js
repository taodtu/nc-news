const connection = require("../db/connection");
exports.fetchArticles = async () => {
 const articles = await connection.select('*').from('articles').returning('*');
 return await Promise.all(articles.map(async article => {
  const comments = await connection.select('article_id').from('articles').where({ article_id: article.article_id }).returning('*');
  return { ...article, comment_count: comments.length }
 }))
};