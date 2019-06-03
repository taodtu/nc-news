const connection = require("../db/connection");
exports.fetchTopics = async () => await connection.select('*').from('topics').returning('*');