const connection = require("../db/connection");
exports.fetchCommentsByArticle = async ({ article_id }, { sort_by = 'created_at', order = 'desc' }) => {
 if (!['asc', 'desc'].includes(order)) return await Promise.reject({ status: 400, msg: 'Wrong Order Query' })

 else return await connection
  .select('*')
  .from('comments')
  .where({ article_id: article_id })
  .orderBy(sort_by, order)
  .returning('*')
  ;
}