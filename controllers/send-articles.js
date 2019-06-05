const { fetchArticles, checkExist } = require('../models/fetch-articles');
exports.sendArticles = async (req, res, next) => {
 try {
  const articles = await fetchArticles(req.query);
  if (!articles[0]) {
   await Promise.all([checkExist(req.query.author, 'users', 'username'), checkExist(req.query.topic, 'topics', 'slug')]);
   res.status(200).send({ articles });
  } else res.status(200).send({ articles });

 } catch (err) {
  next(err)
 }
}
