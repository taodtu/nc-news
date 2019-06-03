const connection = require("../db/connection");
exports.updateArticleByID = async ({ article_id }, { inc_votes }) => {
 const rows = await connection
  .select('*')
  .from('articles')
  .where({ article_id: article_id })
  .increment('votes', inc_votes)
  .returning('*');
 return rows[0];
};