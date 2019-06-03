const { topicData, userData, articleData, commentData } = require('../data');
const { format } = require('../../utils/format')

exports.seed = async (knex, Promise) => {
  await knex.migrate
    .rollback()
    .then(() => knex.migrate.latest());
  await knex('topics')
    .insert(topicData)
  await knex('users')
    .insert(userData)
  const articles = await knex('articles')
    .insert(articleData)
    .returning('*');
  const commentWithAuthor = commentData.map(comment => {
    const { created_by, ...rest } = comment;
    return { ...rest, author: created_by };
  })
  const formattedComment = format(articles, commentWithAuthor, "title", "article_id", "belongs_to")
  await knex('comments')
    .insert(formattedComment)
};
