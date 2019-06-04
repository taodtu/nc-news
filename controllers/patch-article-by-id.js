const { updateArticleByID } = require('../models/update-article-by-id');
exports.patchArticleByID = async (req, res, next) => {
 try {
  if (Object.keys(req.body).length > 1) await Promise.reject({ status: 400, msg: 'Votes Only' });
  if (isNaN(req.body.inc_votes)) await Promise.reject({ status: 400, msg: 'Wrong Update Input' })
  const article = await updateArticleByID(req.params, req.body);
  if (!article) await Promise.reject({ status: 404, msg: 'Article Not Found' })

  res.status(200).send({ article });
 } catch (err) {
  next(err)
 }
}

