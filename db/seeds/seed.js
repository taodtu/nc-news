// const {  } = require('../data');
const { format } = require('../../utils/format')

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      // insert data
    });
};
