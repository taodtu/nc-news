const connection = require("../db/connection");
exports.fetchUserByID = async ({ username }) => {
 const rows = await connection.select('*').from('users').where({ username: username }).returning('*');
 return rows[0];
};