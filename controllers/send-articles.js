const { fetchArticles } = require('../models/fetch-articles');
exports.sendArticles = async (req, res, next) => {
 const articles = await fetchArticles();
 res.status(200).send({ articles });
}
