const connection = require("../db/connection");
exports.fetchArticles = async ({ sort_by = 'created_at', order = 'desc' }) => {
 if (!['asc', 'desc'].includes(order)) return await Promise.reject({ status: 400, msg: 'Wrong Order Query' })

 const articles = await connection.select('*').from('articles').orderBy(sort_by, order).returning('*');

 const result = await Promise.all(articles.map(async article => {
  const comments = await connection.select('article_id').from('articles').where({ article_id: article.article_id }).returning('*');
  return { ...article, comment_count: comments.length }
 }))
 if (order = 'desc') { return result.sort((a, b) => b[sort_by] - a[sort_by]) }
 if (order = 'asc') { return result.sort((a, b) => a[sort_by] - b[sort_by]) }
};