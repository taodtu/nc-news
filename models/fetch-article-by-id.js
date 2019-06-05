const connection = require("../db/connection");
exports.fetchArticleByID = async ({ article_id }) => {
 const rows = await connection
  .select('articles.*')
  .count({ comment_count: 'comment_id' })
  .from('articles')
  .where({ "articles.article_id": article_id })
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id')
  .returning('*').then(articles => articles.map(article => {
   article.comment_count = +article.comment_count;
   return article
  }));;
 return rows[0];
};