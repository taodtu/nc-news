const { updateArticleByID } = require('../models/update-article-by-id');
exports.patchArticleByID = async (req, res, next) => {
 const article = await updateArticleByID(req.params, req.body);
 res.status(200).send({ article });
}
