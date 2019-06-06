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
   const { comment_count, ...rest } = article
   const count = +comment_count;
   return { ...rest, comment_count: count }
  }));;
 return rows[0];
};