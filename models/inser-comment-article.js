const connection = require("../db/connection");
exports.insertCommentToArticle = async ({ article_id }, { username, body }) => {
 const rows = await connection
  .insert({ article_id, author: username, body })
  .into("comments")
  .returning("*");
 return rows[0];
};