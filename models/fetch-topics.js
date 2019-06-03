const connection = require("../db/connection");
exports.fetchTopics = async () => connection.select('*').from('topics').returning('*');