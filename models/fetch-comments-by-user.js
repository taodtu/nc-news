const connection = require("../db/connection");
exports.fetchCommentsByUser = async ({ username }, { sort_by = 'created_at', order = 'desc' }) => {
 return await connection
  .select('*')
  .from('comments')
  .where({ author: username })
  .orderBy(sort_by, order)
  ;
}