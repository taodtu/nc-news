
exports.up = function (knex, Promise) {
 console.log('creating comments table...');
 return knex.schema.createTable('comments', (commentTable) => {
  commentTable.increments('comment_id').primary();
  commentTable.string('author').references('users.username');
  commentTable.integer('article_id').references('articles.article_id');
  commentTable.string('body');
  commentTable.integer('vote').defaultTo(0);
  commentTable.timestamp('created_at').defaultTo(knex.fn.now())
 });
};

exports.down = function (knex, Promise) {
 console.log('removing comments tables...');
 return knex.schema.dropTable('comments');
};
