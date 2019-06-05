const connection = require("../db/connection");
exports.deleteComment = async ({ comment_id }) => {
  const comments = await connection
    .select('comment_id')
    .from('comments')
    .returning('*')
  if (!(comments.some(comment => comment.comment_id === +comment_id))) return await Promise.reject({ status: 400, msg: 'Invalid ID' })
  await connection
    .select('*')
    .from('comments')
    .where({ comment_id: comment_id })
    .del()
};