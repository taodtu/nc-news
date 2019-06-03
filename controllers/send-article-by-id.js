const { fetchArticleByID } = require('../models/fetch-article-by-id');
exports.sendArticleByID = async (req, res, next) => {
 const article = await fetchArticleByID(req.params);
 res.status(200).send({ article });
}
