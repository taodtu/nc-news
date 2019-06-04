const connection = require("../db/connection");
exports.fetchCommentsByArticle = async ({ article_id }) => await connection
 .select('*')
 .from('comments')
 .where({ article_id: article_id })
 .returning('*')
 ;