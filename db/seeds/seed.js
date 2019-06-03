const { topicData, userData, articleData, commentData } = require('../data');
const { format } = require('../../utils/format')

exports.seed = async (knex, Promise) => {
  await knex.migrate.rollback()
  await knex.migrate.latest();
  await Promise.all([knex('topics').insert(topicData), knex('users').insert(userData)]);
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
