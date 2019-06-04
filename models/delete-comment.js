const connection = require("../db/connection");
exports.deleteComment = async ({ comment_id }) => await connection
 .select('*')
 .from('comments')
 .where({ comment_id: comment_id })
 .del()
 ;