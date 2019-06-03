
exports.up = function (knex, Promise) {
 console.log('creating articles table...');
 return knex.schema.createTable('articles', (articleTable) => {
  articleTable.increments('article_id').primary();;
  articleTable.string('title');
  articleTable.string('body');
  articleTable.integer('vote').defaultTo(0);
  articleTable.string('topic').references('topics.slug');
  articleTable.string('author').references('users.username');
  articleTable.timestamp('created_at').defaultTo(knex.fn.now())
 });
};

exports.down = function (knex, Promise) {
 console.log('removing articles tables...');
 return knex.schema.dropTable('articles');
};
