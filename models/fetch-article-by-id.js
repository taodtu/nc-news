const connection = require("../db/connection");
exports.fetchArticleByID = async ({ article_id }) => {
 const rows = await connection.select('*').from('articles').where({ article_id: article_id }).returning('*');
 return rows[0];
};