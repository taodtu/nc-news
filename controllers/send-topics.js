const { fetchTopics } = require('../models/fetch-topics');
exports.sendTopics = async (req, res, next) => {
 const topics = await fetchTopics();
 res.status(200).send({ topics });
}
