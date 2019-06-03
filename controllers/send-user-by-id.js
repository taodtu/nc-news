const { fetchUserByID } = require('../models/fetch-user-by-id');
exports.sendUserByID = async (req, res, next) => {
 const user = await fetchUserByID(req.params);
 res.status(200).send({ user });
}
