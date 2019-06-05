const connection = require("../db/connection");
exports.updateArticleByID = async ({ article_id }, { inc_votes }) => {
 if (!inc_votes) {
  const rows = await connection
   .select('*')
   .from('articles')
   .where({ article_id: article_id })
   .returning('*');
  return rows[0];
 } else {
  const rows = await connection
   .select('*')
   .from('articles')
   .where({ article_id: article_id })
   .increment('votes', inc_votes)
   .returning('*');
  return rows[0];
 }
};