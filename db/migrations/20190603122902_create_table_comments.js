
exports.up = function (knex, Promise) {
 console.log('creating comments table...');
 return knex.schema.createTable('comments', (commentTable) => {
  commentTable.increments('article_id').primary();;
  commentTable.string('title');
  commentTable.string('body');
  commentTable.integer('vote').defaultTo(0);
  commentTable.string('topic').references('topics.slug');
  commentTable.string('author').references('users.username');
  commentTable.timestamp('created_at').defaultTo(knex.fn.now())
 });
};

exports.down = function (knex, Promise) {
 console.log('removing comments tables...');
 return knex.schema.dropTable('comments');
};
