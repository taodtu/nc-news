exports.up = function (knex, Promise) {
 console.log('creating users table...');
 return knex.schema.createTable('users', (userTable) => {
  userTable.string('username').primary();
  userTable.string('avatar_url');
  userTable.string('name')
 });
};

exports.down = function (knex, Promise) {
 console.log('removing users tables...');
 return knex.schema.dropTable('users');
};
