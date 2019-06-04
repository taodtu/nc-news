const { fetchTopics } = require('../models/fetch-topics');
exports.sendTopics = async (req, res, next) => {
 try {
  const topics = await fetchTopics();
  res.status(200).send({ topics });
 } catch (err) {
  next(err)
 }
}
