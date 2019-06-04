const { fetchUserByID } = require('../models/fetch-user-by-id');
exports.sendUserByID = async (req, res, next) => {
 try {
  const user = await fetchUserByID(req.params);
  if (!user) await Promise.reject({ status: 404, msg: 'User Not Found' })
  res.status(200).send({ user });
 } catch (err) {
  next(err)
 }
}
