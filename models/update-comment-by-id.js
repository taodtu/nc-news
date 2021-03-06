const connection = require("../db/connection");
exports.updateCommentByID = async ({ comment_id }, { inc_votes }) => {
 if (!inc_votes) {
  return await connection
   .select('*')
   .from('comments')
   .where({ comment_id: comment_id })
   .returning('*');
 }
 else {
  return await connection
   .select('*')
   .from('comments')
   .where({ comment_id: comment_id })
   .increment('votes', inc_votes)
   .returning('*');
 }
}
